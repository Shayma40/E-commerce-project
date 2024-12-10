const nodemailer = require('nodemailer');


const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bahrishayma4@gmail.com',
            pass: 'uhhpzjtxxdqpiytc'
        },
    });

    console.log('Using EMAIL_USER:', process.env.EMAIL_USER);

    const mailOptions = {
        from: 'bahrishayma4@gmail.com',
        to,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};


module.exports = { sendEmail };