import transporter from './mailer';
import { generatePDFBuffer } from './ticket';

const sendCarExitEmail = async (
  email: string,
  names: string,
  plateNumber: string,
  entryDateTime: Date,
  exitDateTime: Date,
  chargedAmount: number,
  duration: number
) => {
  try {
    const pdfBuffer = await generatePDFBuffer(
      names,
      plateNumber,
      entryDateTime,
      exitDateTime,
      chargedAmount,
      duration
    );

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Car Exit - Parking Receipt',
      html: `
        <!DOCTYPE html>
        <html>
        <body>
            <h2>Dear ${names},</h2>
            <p>Your car with plate number <strong>${plateNumber}</strong> has exited the parking lot.</p>
            <p>Please find the attached receipt for more details.</p>
            <p>Thank you for using our parking service.</p>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `Receipt-${plateNumber}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    return {
      message: 'Exit receipt email sent with PDF attachment',
      status: true,
    };
  } catch (error) {
    return {
      message: 'Failed to send exit receipt email',
      status: false,
    };
  }
};

export { sendCarExitEmail };
