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
            background-color: #b22222;
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
            <p>{{ $details['message'] }} for the position of <strong>{{ $details['position'] }}</strong>.</p>
            <p>We appreciate the time and effort you invested in your application. Although we cannot move forward with
                your application for this role, we encourage you to apply for other openings that may better fit your
                qualifications in the future.</p>
            <p>Thank you again for your interest in joining our team.</p>
            <p>Best regards,</p>
            <p>Recruitment Employers</p>
        </div>
        <div class="footer">
            <p>© 2024 Recruitment Employers. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
