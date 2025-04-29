<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\News;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::updateOrCreate(
            ['email' => 'admin@geopolynesie.com'],
            [
                'name' => 'Christian Friot',
                'password' => Hash::make('@GeoAdmin123'),
            ]
        );

        // Create sample news
        News::updateOrCreate(
            ['slug' => 'le-dernier-ne-des-systemes-deployables-d-hydrographie'],
            [
                'title' => "Le dernier né des Systèmes Déployables d'Hydrographie",
                'content' => '<p>Les groupes hydrographiques et océanographiques ont récemment reçu un nouvel équipement pour l’acquisition de données à la mer : un sondeur bathymétrique multifaisceaux ultra portable, facilement déployable sur une embarcation légère pneumatique.</p>

<p>Ce nouvel outil performant équipe désormais les unités du Shom à Brest, Nouméa et Papeete. En Polynésie, la prise en main est en cours et une première mise en œuvre en levé opérationnel est visée pour la fin du mois d’avril. Grâce au travail d’intégration des équipes brestoises, il rejoint la gamme des <strong>"Systèmes Déployables d’Hydrographie"</strong> et devient un équipement incontournable pour mettre à jour la connaissance bathymétrique sur les profondeurs de 0 à 100m à partir d’embarcations légères.</p><b>Un sondeur performant :</b><p>Ce sondeur multifaisceaux ultra portable du constructeur Norvégien Norbit fournit une très bonne résolution et une densité de mesures importante, offrant ainsi d’excellentes capacités de détection d’obstructions, d’épaves. Ce nouvel équipement va permettre de cartographier de manière efficace les passes, chenaux, accès aux ports et abris de manière programmée ou réactive.</p>',
                'date' => '2024-07-21',
                'read_time' => 2,
                'image' => 'https://static.wixstatic.com/media/5c9a8b_fbd426cbcddb44bdbe3c6d15f4a0e1ee~mv2.jpg/v1/fill/w_650,h_854,al_c,q_85,enc_avif,quality_auto/shom-norbit_JPG.jpg',
                'category' => 'Projets',
                'author_id' => $admin->id,
                'status' => 'PUBLISH',
            ]
        );

        // Add new news article from Shom
        News::updateOrCreate(
            ['slug' => 'formation-et-certification-des-hydrographes'],
            [
                'title' => "Formation et certification des hydrographes",
                'content' => '<p><em>Pourquoi est-il important de confier vos travaux d’hydrographie à des hydrographes certifiés ?</em></p>
        <p>Contrairement à la carte terrestre qui décrit une topographie que l’on peut voir, une carte marine décrit un environnement en grande partie invisible. La carte marine est le fil d’Ariane des navigateurs : elle lui indique un chemin sûr, représente les amers utiles pour se positionner en vue des côtes, signale les dangers… mais elle est aussi un support d’informations utiles telles que les zones réglementées, les limites de parcs naturels…</p>
        <p>Les levés hydrographiques sont le socle essentiel de ce document de référence. Aussi, l’engagement du Shom sur la qualité de la carte marine et par conséquent la confiance que les utilisateurs peuvent accorder à ce document repose sur la qualité et la cohérence des données. Or, la réalisation d’un levé hydrographique dans l’objectif de garantir la sécurité des navigateurs est un art difficile qui doit respecter des normes et des méthodes, pour lesquels les hydrographes sont formés et certifiés.</p>
        <p><strong>Certification des hydrographes :</strong><br>Le caractère mondial des enjeux liés à la sécurité de la navigation rend indispensable la définition de normes internationales pour l’hydrographie. Trois organisations internationales interviennent : la FIG, l’OHI et l’ACI. Elles encouragent et publient des normes définissant des niveaux de compétence pour les hydrographes. Elles fixent les compétences minimales que doivent avoir les professionnels du domaine pour assurer une reconnaissance internationale.</p>
        <ul>
        <li><a href="http://formation.univ-brest.fr/fr/index.html">Université de Brest</a> – Formation de niveau B</li>
        <li><a href="https://www.afhy.fr/certification-des-individus">AFHy – Certification française des individus</a></li>
        </ul>
        <p>L’hydrographe doit maîtriser plusieurs compétences : connaissance de la bathymétrie, des capteurs, de la calibration, du traitement de données, des conversions de coordonnées, de la géodésie, de la cartographie, des systèmes d’information géographique (SIG), etc.</p>
        <p>Enfin, la qualification d’un levé reste une étape incontournable. Elle permet de vérifier que le cahier des charges est respecté et que le produit livré est conforme. Ce contrôle rigoureux permet d’en garantir la qualité et la fiabilité.</p>
        <p><strong>Source : </strong><a href="https://www.shom.fr/index.php/fr/liste-actualites/formation-et-certification-des-hydrographes">Shom</a></p>',
                'date' => '2023-05-17',
                'read_time' => 4,
                'image' => '/public/news/2020-10/Album_GOA_BHO_2010_012.jpg',
                'category' => 'Formation',
                'author_id' => $admin->id,
                'status' => 'PUBLISH',
            ]
        );

    }
}
