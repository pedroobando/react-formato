import jsPDF from 'jspdf';

export const formatoOrdenSalida = ({
  numerosec = 'ADM-00021-2020',
  fecha = '23/11/2020',
  solicitante = { nombre: 'Francisco Perez', dni: 'V-22.325.653' },
  transporte = { marca: 'Toyota', modelo: 'Dyna', color: 'blanco', placa: 'GSR3204X' },
  material = 'Lorem ipsum dolor sit amet consectetur',
  motivo = 'Lorem ipsum dolor sit amet consectetur',
  destino = 'Lorem ipsum dolor sit amet consectetur',
  comentario = 'Lorem ipsum dolor sit amet consectetur',
  aprobadoradm = {
    dni: 'V-15.157.945',
    nombre: 'aprobador adm',
  },
  aprobadorseg = { dni: '21212', nombre: 'aprobador seg' },
  usuario = { dni: '', nombre: 'pedro obando' },
  direccion = 'Zona Industrial los montones, calle el llenadero. Barcelona Edo. Anzoátegui. Telefonos: (0424)-8772259 (0212)-7500510',
  departamento = { id: '', nombre: 'xxxx' },
}) => {
  const doc = new jsPDF('portrait', 'pt', 'letter');

  const left = 15;
  const topHead = 20;
  // let topContext = 50;

  formato(
    doc,
    left,
    topHead,
    false,
    numerosec,
    fecha,
    solicitante,
    transporte,
    material,
    motivo,
    destino,
    comentario,
    aprobadoradm,
    aprobadorseg,
    usuario,
    direccion,
    `COPIA: ${departamento.nombre}`
  );

  formato(
    doc,
    left,
    400,
    false,
    numerosec,
    fecha,
    solicitante,
    transporte,
    material,
    motivo,
    destino,
    comentario,
    aprobadoradm,
    aprobadorseg,
    usuario,
    direccion,
    'COPIA: PROTECCION Y BIENES'
  );

  formato(
    doc,
    left,
    topHead,
    true,
    numerosec,
    fecha,
    solicitante,
    transporte,
    material,
    motivo,
    destino,
    comentario,
    aprobadoradm,
    aprobadorseg,
    usuario,
    direccion,
    `COPIA SOLICITANTE: ${solicitante.nombre} `
  );

  doc.save(`ORD-${numerosec}.pdf`);
};

const formato = (
  doc,
  left,
  topHead,
  newPage = false,
  numerosec = 'ADM-00021-2020',
  fecha = '23/11/2020',
  solicitante = { nombre: 'Francisco Perez', dni: 'V-22.325.653' },
  transporte = { marca: 'Toyota', modelo: 'Dyna', color: 'blanco', placa: 'GSR3204X' },
  material = 'Lorem ipsum dolor sit amet consectetur',
  motivo = 'Lorem ipsum dolor sit amet consectetur',
  destino = 'Lorem ipsum dolor sit amet consectetur',
  comentario = 'Lorem ipsum dolor sit amet consectetur',
  aprobadoradm = {
    dni: 'V-15.157.945',
    nombre: 'aprobador adm',
  },
  aprobadorseg = { dni: '21212', nombre: 'aprobador seg' },
  usuario = { dni: '', nombre: 'pedro obando' },
  direccion = 'Zona Industrial los montones, calle el llenadero. Barcelona Edo. Anzoátegui. Telefonos: (0424)-8772259 (0212)-7500510',
  copia = ''
) => {
  // const left = 15;
  // const topHead = 10;

  if (newPage) doc.addPage('portrait', 'pt', 'letter');
  let topContext = topHead + 50;

  doc.setDrawColor(0);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(left, topHead, 580, 340, 3, 3, 'FD'); //  Black square with rounded corners

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  doc.text('GRASACA GRASAS SAN CARLOS C.A.', left + 75, topHead + 20, {
    align: 'center',
  });
  doc.text('J-31104331-4', left + 75, topHead + 35, { align: 'center' });

  doc.text(`Nro. GUIA: ${numerosec}`, left + 460, topHead + 20, { align: 'left' });
  doc.text(`FECHA: ${fecha}`, left + 460, topHead + 35, { align: 'left' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(
    'AUTORIZACION DE SALIDA DE MATERIALES Y EQUIPOS DE PLANTA',
    300,
    topHead + 22,
    {
      align: 'center',
      maxWidth: 260,
    }
  );
  // doc.setLineWidth(0.5);

  doc.line(left, topHead + 50, 595, topHead + 50);
  doc.setFontSize(9);

  topContext += 20;
  doc.setFont('helvetica', 'normal');
  doc.text(`NOMBRE: ${solicitante.nombre.toUpperCase()}`, left + 10, topContext);
  doc.text(`CEDULA ID: ${solicitante.dni.toUpperCase()}`, left + 350, topContext);

  topContext += 20;
  doc.text(
    `VEHICULO O TRANSPORTE: ${transporte.marca.toUpperCase()} ${transporte.modelo.toUpperCase()} ${transporte.color.toUpperCase()}`,
    left + 10,
    topContext
  );
  doc.text(`PLACA: ${transporte.placa.toUpperCase()}`, left + 350, topContext);

  topContext += 30;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`MATERIAL O EQUIPO: ${material.toUpperCase()}`, left + 10, topContext, {
    align: 'left',
    maxWidth: 560,
  });

  topContext += 40;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`MOTIVO DE SALIDA: ${motivo.toUpperCase()}`, left + 10, topContext, {
    align: 'left',
    maxWidth: 300,
  });

  // topContext += 40;
  doc.text(`DESTINO: ${destino.toUpperCase()}`, left + 350, topContext, {
    align: 'left',
    maxWidth: 220,
  });

  topContext += 50;
  doc.text(`COMENTARIO: ${comentario.toUpperCase()}`, left + 10, topContext, {
    align: 'left',
    maxWidth: 560,
  });

  topContext += 30;
  doc.line(left, topContext, 595, topContext);
  topContext += 5;
  doc.line(left, topContext, 595, topContext);

  doc.line(left + 130, topContext, left + 130, topContext + 60);
  doc.line(left + 280, topContext, left + 280, topContext + 60);
  doc.line(left + 430, topContext, left + 430, topContext + 60);

  topContext += 10;
  doc.setFontSize(7);
  doc.text(`ELABORADO POR`, left + 10, topContext, {
    align: 'left',
    maxWidth: 100,
  });

  doc.text(`SOLICITADO POR`, left + 140, topContext, {
    align: 'left',
    maxWidth: 100,
  });

  doc.text(`AUTORIZADO POR`, left + 290, topContext, {
    align: 'left',
    maxWidth: 100,
  });

  doc.text(`POR PROTECCION Y BIENES`, left + 440, topContext, {
    align: 'left',
    maxWidth: 100,
  });

  topContext += 35;
  doc.setFontSize(8);
  doc.text(`${usuario.nombre.toUpperCase()}`, left + 10, topContext, {
    align: 'left',
    maxWidth: 150,
  });

  doc.text(`${solicitante.nombre.toUpperCase()}`, left + 140, topContext, {
    align: 'left',
    maxWidth: 150,
  });

  doc.text(`${aprobadoradm.nombre.toUpperCase()}`, left + 290, topContext, {
    align: 'left',
    maxWidth: 150,
  });

  doc.text(`${aprobadorseg.nombre.toUpperCase()}`, left + 440, topContext, {
    align: 'left',
    maxWidth: 150,
  });

  topContext += 10;
  doc.setFontSize(7);
  doc.text(`${usuario.dni.toUpperCase()}`, left + 10, topContext, {
    align: 'left',
    maxWidth: 100,
  });

  doc.text(`${solicitante.dni.toUpperCase()}`, left + 140, topContext, {
    align: 'left',
    maxWidth: 100,
  });

  doc.text(`${aprobadoradm.dni.toUpperCase()}`, left + 290, topContext, {
    align: 'left',
    maxWidth: 100,
  });

  doc.text(`${aprobadorseg.dni.toUpperCase()}`, left + 440, topContext, {
    align: 'left',
    maxWidth: 100,
  });

  topContext += 5;
  doc.line(left, topContext, 595, topContext);

  doc.setFont('helvetica');
  doc.setFontSize(8);
  topContext += 10;
  doc.text(`${direccion}`, left + 300, topContext, {
    align: 'center',
    maxWidth: 500,
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  topContext += 10;
  doc.text(copia.toUpperCase(), left + 300, topContext, {
    align: 'center',
    maxWidth: 500,
  });
};
