import PDFDocument from 'pdfkit';
import streamBuffers from 'stream-buffers';

export const generatePDFBuffer = (
  names: string,
  plateNumber: string,
  entryDateTime: Date,
  exitDateTime: Date,
  chargedAmount: number,
  duration: number
) => {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument();
    const bufferStream = new streamBuffers.WritableStreamBuffer();

    doc.pipe(bufferStream);

    doc.fontSize(18).text('Parking Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Name: ${names}`);
    doc.text(`Plate Number: ${plateNumber}`);
    doc.text(`Entry Time: ${new Date(entryDateTime).toLocaleString()}`);
    doc.text(`Exit Time: ${new Date(exitDateTime).toLocaleString()}`);
    doc.text(`Duration: ${duration} hour(s)`);
    doc.text(`Charged Amount: $${chargedAmount.toFixed(2)} RWF`);
    doc.text('Thank you for using our parking service.');

    doc.end();

    bufferStream.on('finish', () => {
      resolve(bufferStream.getContents() as Buffer);
    });

    bufferStream.on('error', reject);
  });
};