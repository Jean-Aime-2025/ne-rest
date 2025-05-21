import PDFDocument from 'pdfkit';

export function generateTicketPDF(data: { plateNumber: string; chargedAmount: number; date?: string }) {
  const doc = new PDFDocument({ size: 'A4' });
  const buffers: Buffer[] = [];
  doc.on('data', buffers.push.bind(buffers));

  return new Promise<Buffer>((resolve, reject) => {
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on('error', reject);

    doc.fontSize(20).text('Parking Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Plate Number: ${data.plateNumber}`);
    doc.text(`Charged Amount: ${data.chargedAmount} RWF`);
    doc.text(`Date: ${data.date || new Date().toLocaleString()}`);

    doc.end();
  });
}