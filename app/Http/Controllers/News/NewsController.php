<?php

namespace App\Http\Controllers\News;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    /**
     * Get the news in home page.
     */
    public function getNewHomePage(Request $request): Response
    {
        $latestNews = News::latest('date')
            ->where('status', 'PUBLISH')
            ->take(3)
            ->get();

        return Inertia::render('home', [
            'newsItems' => $latestNews
        ]);
    }

    /**
     * Get all news with pagination.
     */
    public function getAllNews(Request $request): Response
    {
        $query = News::query()->where('status', 'PUBLISH')->latest('date');

        if ($request->category && $request->category !== 'Tous') {
            $query->where('category', $request->category);
        }

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhere('content', 'like', "%{$request->search}%");
            });
        }

        $news = $query->paginate(6)->withQueryString();
        $news->getCollection()->transform(function ($item) {
            $item->links = [];
            return $item;
        });

        $recentPublications = News::with('author')
            ->where('status', 'PUBLISH')
            ->latest('date')
            ->take(3)
            ->get()
            ->map(function ($news) {
                return [
                    'title' => $news->title,
                    'author' => $news->author->name,
                    'journal' => substr($news->content, 0, 30) . '...',
                    'year' => $news->date->format('Y'),
                    'slug' => $news->slug,
                ];
            });

        return Inertia::render('news', [
            'newsItems' => $news,
            'recentPublications' => $recentPublications,
        ]);
    }

    /**
     * Get all news for admin panel with pagination.
     */
    public function getAdminNews(Request $request): Response
    {
        $query = News::with('author')->latest('date');

        if ($request->category) {
            $query->where('category', $request->category);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhere('content', 'like', "%{$request->search}%");
            });
        }

        $news = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/news', [
            'newsItems' => $news,
        ]);
    }

    /**
     * Get news detail by slug
     */
    public function getNewsDetail(string $slug): Response
    {
        try {
            $newsItem = News::with('author')
                ->where('slug', $slug)
                ->where('status', 'PUBLISH')
                ->firstOrFail();

            $relatedNews = News::where('category', $newsItem->category)
                ->where('slug', '!=', $slug)
                ->where('status', 'PUBLISH')
                ->latest('date')
                ->take(3)
                ->get();

            return Inertia::render('new-detail', [
                'newsItem' => $newsItem,
                'relatedNews' => $relatedNews,
                'categories' => ['Projets', 'Partenariats', 'Événements', 'Équipements', 'Formation']
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return Inertia::render('new-detail', [
                'error' => 'not_found'
            ]);
        }
    }

    /**
     * Store a new news item.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'status' => 'required|in:PUBLISH,DRAFT,ARCHIVED',
        ]);

        try {
            $news = new News();
            $news->title = $request->title;
            $news->slug = Str::slug($request->title);
            $news->content = $request->content;
            $news->category = $request->category;
            $news->status = $request->status;
            $news->author_id = auth()->id();
            $news->date = now();
            $news->read_time = ceil(str_word_count(strip_tags($request->content)) / 200);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('public/news');
                $news->image = Storage::url($path);
            }

            $news->save();

            return redirect()->back()->with('success', 'Journal créé avec succès');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la création du journal');
        }
    }

    /**
     * Update the specified news item.
     */
    public function update(Request $request, $slug)
    {
        $news = News::where('slug', $slug)->firstOrFail();
        
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'status' => 'required|in:PUBLISH,DRAFT,ARCHIVED',
        ]);

        try {
            $news->title = $request->title;
            $news->slug = Str::slug($request->title);
            $news->content = $request->content;
            $news->category = $request->category;
            $news->status = $request->status;
            $news->read_time = ceil(str_word_count(strip_tags($request->content)) / 200);

            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($news->image) {
                    $oldPath = str_replace('/storage/', 'public/news', $news->image);
                    if (Storage::exists($oldPath)) {
                        Storage::delete($oldPath);
                    }
                }

                // Store new image
                $path = $request->file('image')->store('public/news');
                $news->image = Storage::url($path);
            }

            $news->save();

            return redirect()->back()->with('success', 'Journal modifié avec succès');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la modification du journal');
        }
    }

    /**
     * Delete the specified news item.
     */
    public function destroy($slug)
    {
        try {
            $news = News::where('slug', $slug)->firstOrFail();
            
            // Delete image from storage if exists
            if ($news->image) {
                $imagePath = str_replace('/storage/', 'public/', $news->image);
                if (Storage::exists($imagePath)) {
                    Storage::delete($imagePath);
                }
            }
            
            $news->delete();
            
            return redirect()->back()->with('success', 'Journal supprimé avec succès');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la suppression du journal');
        }
    }
}
