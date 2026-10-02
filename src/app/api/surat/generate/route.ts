import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const template = await prisma.documentTemplate.findUnique({
      where: { id },
    });

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    let parsedContent;
    try {
      parsedContent = JSON.parse(template.content);
    } catch (e) {
      return NextResponse.json({ error: "Invalid template content" }, { status: 500 });
    }

    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();
    let currentY = height - 50;

    const drawTextCentered = (text: string, font: any, size: number, y: number) => {
      const textWidth = font.widthOfTextAtSize(text, size);
      page.drawText(text, {
        x: (width - textWidth) / 2,
        y: y,
        size: size,
        font: font,
        color: rgb(0, 0, 0),
      });
    };

    // Header
    const headerLines = (parsedContent.header || "").split('\n');
    headerLines.forEach((line: string, i: number) => {
      const isLastHeaderLine = i === headerLines.length - 1;
      drawTextCentered(line, isLastHeaderLine ? timesBoldFont : timesRomanFont, isLastHeaderLine ? 16 : 14, currentY);
      currentY -= 20;
    });

    // Separator line
    currentY -= 10;
    page.drawLine({
      start: { x: 50, y: currentY },
      end: { x: width - 50, y: currentY },
      thickness: 2,
      color: rgb(0, 0, 0),
    });
    currentY -= 30;

    // Title
    drawTextCentered(parsedContent.title || "SURAT KETERANGAN", timesBoldFont, 16, currentY);
    page.drawLine({
      start: { x: (width - timesBoldFont.widthOfTextAtSize(parsedContent.title || "SURAT KETERANGAN", 16)) / 2, y: currentY - 2 },
      end: { x: (width + timesBoldFont.widthOfTextAtSize(parsedContent.title || "SURAT KETERANGAN", 16)) / 2, y: currentY - 2 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    currentY -= 20;
    
    // Nomor Surat
    drawTextCentered("Nomor: 140/    /438.7.9.14/2026", timesRomanFont, 12, currentY);
    currentY -= 40;

    // Body text (simple word wrap)
    const margin = 50;
    const maxWidth = width - margin * 2;
    const bodyWords = (parsedContent.body || "").split(" ");
    let lineText = "";
    
    bodyWords.forEach((word: string) => {
      const testLine = lineText + word + " ";
      const testWidth = timesRomanFont.widthOfTextAtSize(testLine, 12);
      if (testWidth > maxWidth) {
        page.drawText(lineText, {
          x: margin,
          y: currentY,
          size: 12,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        lineText = word + " ";
        currentY -= 15;
      } else {
        lineText = testLine;
      }
    });
    
    if (lineText.trim()) {
      page.drawText(lineText, {
        x: margin,
        y: currentY,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
    }
    currentY -= 60;

    // Footer signature
    const footerLines = (parsedContent.footer || "Kepala Desa Simoketawang").split('\n');
    const signatureX = width - 200;
    
    const today = new Date();
    const dateStr = `Sidoarjo, ${today.getDate()} ${today.toLocaleString('id-ID', { month: 'long' })} ${today.getFullYear()}`;
    page.drawText(dateStr, {
      x: signatureX,
      y: currentY,
      size: 12,
      font: timesRomanFont,
    });
    currentY -= 20;

    footerLines.forEach((line: string) => {
      page.drawText(line, {
        x: signatureX,
        y: currentY,
        size: 12,
        font: timesBoldFont,
      });
      currentY -= 15;
    });

    currentY -= 60; // Space for signature

    page.drawText("( ________________________ )", {
      x: signatureX,
      y: currentY,
      size: 12,
      font: timesBoldFont,
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${template.slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generate Error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
