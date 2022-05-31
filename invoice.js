// const PDFDocument = require('pdfkit');
const fs = require('fs');
const { flushPages } = require('pdfkit');
const PDFDocument = require("pdfkit-table");
const addTextbox = require("textbox-for-pdfkit");
var express = require('express')
var app = express()

// Create a document
app.get("/", () => {
    console.log("invoice..");
    const doc = new PDFDocument({ margin: 10 });

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('invoice.pdf'));

    // // Embed a font, set the font size, and render some text
    // doc
    //   .font('fonts/PalatinoBold.ttf')
    //   .fontSize(25)
    //   .text('Some text with an embedded font!', 100, 100);

    // Add an image, constrain it to a given size, and center it vertically and horizontally
    doc
        .image("./img/img.png", {
            fit: [150, 150],
            align: 'left',
            valign: 'left',
        }).fillColor("#808080")
        .fontSize(10)
        .text("\nwww.polynomial.ai",10,70)
        .moveTo(280, 15)
        .lineTo(280, 130)
        .stroke()
        
       .fontSize(12)
        .text("Bill to:", 20, 20, { align: "center", valign: "right" }).fillColor("#000000")
        .font("./calibri Bold.ttf").fontSize(14)
        .text("\nKaushik Kumar Rout", 108, 20, { align: "center", valign: "right" }).fillColor("#808080")
        .font("./Calibri Light.ttf").fontSize(12)
        .text("  Contractors' Colony,Burla,sambalpur,", 160, 55, { align: "center", valign: "right" })
        .text("Odisha-758017", 60, 75, { align: "center", valign: "right" }).fillColor("#000000")
        .font("./calibri Bold.ttf").fontSize(12)
        .text("Kasushik.r@polynomial.ai", 115, 94, { align: "center", valign: "right" })
        .text("+91 7894850703", 65, 112, { align: "center", valign: "right" })
        .text("\n")

        // const textArray1 = [
        //     { text: "Bill to:", align: "center",valign:"left",newLine:true ,fillColor:"#808080"},
        //     { text: "Kaushik Kumar Rout", align: "center",valign:"left",newLine:true },
        //     { text: "Contractors' Colony,Burla,sambalpur,", align: "center",valign:"right",newLine:true },
        //     { text: "Odisha-758017", align: "center",valign:"right",newLine:true },
        //     { text: "Kasushik.r@polynomial.ai", align: "center",valign:"right",newLine:true },
        //     { text: "+91 7894850703", align: "center",valign:"right",newLine:true },
        // ];
        // addTextbox(textArray1, doc, 20, 20, 700, {
        //     fontSize: 14,
        //     lineHeight: 1.5,
        //     align: "left",
        //     valign:"center"
        // });
        //     .fontSize(30).fillColor("#F47E38")
        //     .text("I N V O I C E", 0, 150, { align: "left", valign: "left" })
        //     .fontSize(10).fillColor("#000000").text("\n")
        //     .text("Invoice#          24856", 0, 190).text("\n")
        //     .text("Date     01 / 02 / 2022", 0, 210).fillColor("#F47E38");
        // doc.lineWidth(25).fillColor("#F47E38")
        doc
        .fontSize(42)
        .font("./calibri Bold.ttf")
        .fillColor("#FF6438")
        .text(" I N V O I C E", 0, 150, { align: "left", valign: "left" })
        .fontSize(10)
        .fillColor("#000000")
        .text("\n")
        .text("Invoice #                      24856", 10, 200, {
            align: "left",
            continued: true,
        })
        .text("\n")
        .text("Date               01 / 02 / 2022", 10, 215, {
            align: "left",
            valign: "left",
        });

    doc.text("\n\n")

    // // table 
    const tableArray = {
        divider: {
            header: { disabled: false, width: 20 },
            horizontal: { disabled: false, width: 50 },
            vertical: { disabled: false, width: 30 },
            padding: 100,
            margin: 100,
            columnSpacing: 500,

        },
        padding: 5, columnsSize: 50,
        headers: [
            // "Sl no.", "Subscription", "Billing cycle", "Payment date", "Price",
            { label: "    Sl no.", property: 'slno', width: 100, outerHeight: 100, renderer: String, headerColor: '#FF6438', headerOpacity: 1.0, columnOpacity: 1.0 },
            { label: "Subscription", property: 'subscription', width: 130, outerHeight: 100, renderer: null, headerColor: '#FF6438', headerOpacity: 1.0 },
            { label: "Billing cycle", property: 'billingcycle', width: 130, renderer: String, headerColor: '#FF6438', headerOpacity: 1.0 },
            { label: "Payment date", property: 'paymentdate', width: 130, renderer: String, headerColor: '#FF6438', headerOpacity: 1.0 },
            { label: "Price", property: 'price', width: 100, headerColor: '#FF6438', headerOpacity: 1.0, renderer: (value, indexColumn, indexRow, row) => { return ` ${String(value)}` } },
        ],
        datas: [
            { slno: "      1.", subscription: "BASIC PLAN", billingcycle: " 01 / 02 / 2022", paymentdate: " 01 / 02 / 2022", price: "$49.00", options: { fontSize: 20, fillColor: "#000000" } },
            { slno: "      2.", subscription: "STANDARD PLAN", billingcycle: " 01 / 02 / 2022", paymentdate: " 01 / 02 / 2022", price: "$79.00", options: { fontSize: 20 } },
            { slno: "      3.", subscription: "BUSINESS PLAN", billingcycle: " 01 / 02 / 2022", paymentdate: " 01 / 02 / 2022", price: "$49.00", options: { fontSize: 20 } },
            {
                slno: " ", subscription: " ", billingcycle: " ", paymentdate: " ", price: "", options: { fontSize: 20 }
            },
            {
                slno: " ", subscription: " ", billingcycle: " ", paymentdate: " ", price: "", options: { fontSize: 20 }
            }
        ],

    };

    doc.table(tableArray, {
        prepareHeader: () => doc.font("Helvetica-Bold").fillColor("white").fontSize(14),
        hideHeader: false,
        minRowHeight: 20,

        prepareRow: (row, indexColumn, indexRow, rectRow) => {
            doc.font("Helvetica-Bold").fillColor("black").fontSize(12);
            indexColumn === 0 && doc.addBackground(rectRow, (indexRow % 2 ? '#C0C0C0' : '#DCDCDC'), 0.5);
        },

    })


    const textArray = [
        { text: "Payment is due max 7 days after", align: "left" },
        { text: "invoice without deduction.", align: "left", newLine: true },
        {
            text: "Your bank and other details space here.",
            align: "left",
            newLine: true,
        },
    ];
    addTextbox(textArray, doc, 20, 430, 300, {
        color: "#808080",
        fontSize: 14,
        lineHeight: 1.5,
        align: "center",
    });
    doc.fillColor("#808080").moveTo(470, 480).lineTo(595, 480).stroke();

    const textArr = [
        { text: "Subtotal   ", align: "right", },
        { text: "$227.00", align: "left" },
        { text: "Tax       ", align: "right",valign:"left", newLine: true },
        { text: "0.00%", align: "right" },
        { text: "Total     ", align: "right", newLine: true },
        { text: "$227.00", align: "right" },
    ];
    addTextbox(textArr, doc, 10, 430, 585, {
        font:"Helvetica-Bold",
        color: "#000000",
        fontSize: 14,
        lineHeight: 2.0,
        align: "center",
    });
    
    // doc.table(tableArray, {
    //     prepareHeader: () =>
    //       doc.font("Helvetica-Bold").fillColor("white").fontSize(12),
    //     prepareRow: (row, indexColumn, indexRow, rectRow) => {
    //       doc.font("Helvetica").fillColor("black").fontSize(10);
    //       indexColumn == 0 &&
    //         doc.addBackground(rectRow, indexRow % 2 ? "#CDCDCD" : "#E1E1E1", 1);
    //     },
    //   });



    doc.lineWidth(1).fillColor("#000000")
    doc.lineCap('butt')
        .moveTo(0, 730)
        .lineTo(700, 730)
        .fillAndStroke("#000000")
        .stroke();
    doc.font("./calibri Bold.ttf")
    doc.text("POLYNOMIAL AI INDIA PRIVATE LTD", 0, 735, { align: "center" })
    doc.font("Helvetica").fillColor("black").fontSize(10).text("A-201, Nagarjuna GreenWoods, Kadubeesanhali,Belladur , Bangalore 56103", 0, 753, { align: "center" })

    doc.lineWidth(25).fillColor("#FF6438")
    doc.lineCap('butt')
        .moveTo(0, 780)
        .lineTo(700, 780)
        .fillAndStroke("#FF6438")
        .stroke();
    doc.end();
    console.log("done")
})
app.listen(8000,()=>{
    console.log("app is listening on http://localhost:8000")
})