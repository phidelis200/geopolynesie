<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Accusé de réception</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Bonjour {{ $contact->name }},</h2>
        
        <p>Nous avons bien reçu votre message concernant "{{ $contact->subject }}".</p>
        
        <p>Notre équipe va l'examiner et vous répondra dans les plus brefs délais.</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <strong>Votre message :</strong><br>
            {{ $contact->message }}
        </div>
        
        <p>Cordialement,<br>L'équipe Géopolynésie</p>
    </div>
</body>
</html>
