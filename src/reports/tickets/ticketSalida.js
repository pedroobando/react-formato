import jsPDF from 'jspdf';

export const ticketSalida = ({
  numerosec = 'ADM-00021-2020',
  fecha = '23/11/2020',
  solicitante = { nombre: 'Francisco Perez', dni: 'V-22.325.653' },
  transporte = { marca: 'Toyota', modelo: 'Dyna', color: 'blanco', placa: 'GSR3204X' },
}) => {
  const doc = new jsPDF('portrait', 'pt', 'letter');

  const left = 15;
  const topHead = 10;
  const topContext = 50;

  doc.setDrawColor(0);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(left, topHead, 580, 200, 3, 3, 'FD'); //  Black square with rounded corners

  doc.setFont('helvetica');
  doc.setFontSize(8);

  doc.text('GRASACA GRASAS SAN CARLOS C.A.', left + 75, topHead + 15, {
    align: 'center',
  });
  doc.text('J-31104331-4', left + 75, topHead + 30, { align: 'center' });

  doc.text(`Nro. GUIA: ${numerosec}`, left + 460, topHead + 15, { align: 'left' });
  doc.text(`FECHA: ${fecha}`, left + 460, topHead + 30, { align: 'left' });

  doc.setFontSize(12);
  doc.text(
    'AUTORIZACION DE SALIDA DE MATERIALES Y EQUIPOS DE PLANTA',
    300,
    topHead + 15,
    {
      align: 'center',
      maxWidth: 260,
    }
  );
  // doc.setLineWidth(0.5);

  doc.line(left, topHead + 36, 595, topHead + 36);
  doc.setFontSize(9);

  doc.text(`NOMBRE: ${solicitante.nombre.toUpperCase()}`, left + 10, topContext + 15);
  doc.text(`CEDULA ID: ${solicitante.dni.toUpperCase()}`, left + 350, topContext + 15);

  doc.text(
    `VEHICULO O TRANSPORTE: ${transporte.marca.toUpperCase()} ${transporte.modelo.toUpperCase()} ${transporte.color.toUpperCase()}`,
    left + 10,
    topContext + 30
  );
  doc.text(`PLACA: ${transporte.placa.toUpperCase()}`, left + 350, topContext + 30);

  // doc.text("J-31104331-4", 80, 30, { align: "center" });

  // doc.text(20, 20, "This is the first title.");

  // doc.setFont("helvetica");
  // // doc.setFontType("normal");
  // doc.setTextColor(100);
  // doc.text(20, 60, "This is the second title.", "center");
  // doc.text("This single line is centered", 30, 50, "center");

  // doc.setFont("courier", "italic");
  // // doc.setFont("bolditalic");
  // doc.text(20, 100, "This is the thiRd title.");
  // // doc.lineTo(20, 60);
  // doc.setTextColor(0, 0, 255);
  // doc.text("mensaje de texto", 20, 120);
  doc.addPage('letter', 'portrait');

  doc.text('This text is normally\raligned.', 140, 50);

  doc.text('This text is centered\raround\rthis point.', 140, 120, 'center');

  doc.text(
    'This text is rotated\rand centered around\rthis point.',
    140,
    300,
    45,
    'center'
  );

  doc.text('This text is\raligned to the\rright.', 140, 400, 'right');

  doc.text('This text is\raligned to the\rright.', 140, 550, 45, 'right');

  doc.text('This single line is centered', 460, 50, 'center');

  doc.text('This right aligned text\r\rhas an empty line.', 460, 200, 'right');

  doc.addPage('letter', 'portrait');

  doc.rect(20, 20, 10, 10); // empty square

  doc.rect(40, 20, 10, 10, 'F'); // filled square

  doc.setDrawColor(255, 0, 0);
  doc.rect(60, 20, 10, 10); // empty red square

  doc.setDrawColor(255, 0, 0);
  doc.rect(80, 20, 10, 10, 'FD'); // filled square with red borders

  doc.setDrawColor(0);
  doc.setFillColor(255, 0, 0);
  doc.rect(100, 20, 10, 10, 'F'); // filled red square

  doc.setDrawColor(0);
  doc.setFillColor(255, 0, 0);
  doc.rect(120, 20, 10, 10, 'FD'); // filled red square with black borders

  doc.setDrawColor(0);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(180, 40, 100, 100, 3, 3, 'FD'); //  Black square with rounded corners

  doc.addPage('letter', 'portrait');

  doc.line(20, 20, 60, 20); // horizontal line

  doc.setLineWidth(0.5);
  doc.line(20, 25, 60, 25);

  doc.setLineWidth(1);
  doc.line(20, 30, 60, 30);

  doc.setLineWidth(1.5);
  doc.line(20, 35, 60, 35);

  doc.setDrawColor(255, 0, 0); // draw red lines

  doc.setLineWidth(0.1);
  doc.line(100, 20, 100, 60); // vertical line

  doc.setLineWidth(0.5);
  doc.line(105, 20, 105, 60);

  doc.setLineWidth(1);
  doc.line(110, 20, 110, 60);

  doc.setLineWidth(1.5);
  doc.line(115, 20, 115, 60);

  doc.save(`ORD-${numerosec}.pdf`);
};
