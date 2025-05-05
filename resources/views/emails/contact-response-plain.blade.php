Bonjour {{ $contact->name }},

En réponse à votre message concernant "{{ $contact->subject }}" :

{{ strip_tags($contact->answer_message) }}

Cordialement,
L'équipe Géopolynésie
