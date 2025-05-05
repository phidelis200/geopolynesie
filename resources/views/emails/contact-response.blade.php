<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Réponse à votre message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Bonjour {{ $contact->name }},</h2>
        
        <p style="margin: 20px 0;">En réponse à votre message concernant "{{ $contact->subject }}" :</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            {!! nl2br($contact->answer_message) !!}
        </div>
        
        <p style="margin-top: 20px; color: #666;">
            Cordialement,<br>
            L'équipe Géopolynésie
        </p>
    </div>
</body>
</html>
