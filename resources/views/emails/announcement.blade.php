<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $details['subject'] }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding: 10px;
            background-color: #4a47a3;
            color: #fff;
            border-radius: 8px 8px 0 0;
        }

        .content {
            padding: 20px;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>{{ $details['subject'] }}</h1>
        </div>
        <div class="content">
            <p>Dear {{ $details['applicant_name'] }},</p>
            <p><strong>{{ $details['message'] }}</strong></p>
            <p>We are excited to have you join our team and look forward to a successful journey together.</p>
            <p>Best regards,</p>
            <p>Recruitment Employers</p>
        </div>
        <div class="footer">
            <p>© 2024 Recruitment Employers. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
