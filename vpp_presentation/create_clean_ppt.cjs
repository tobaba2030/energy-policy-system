const PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// 创建演示文稿
const pptx = new PptxGenJS();

// 设置幻灯片尺寸（16:9宽屏）
pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 inches

// 设置默认字体
pptx.defineLayout({ name: "CUSTOM", width: 13.33, height: 7.5 });
pptx.layout = "CUSTOM";

// 读取图片目录
const imagesDir = "c:\\AI学习资料\\mesheer\\vpp_presentation\\extracted_images";
const textData = JSON.parse(fs.readFileSync("c:\\AI学习资料\\mesheer\\vpp_presentation\\recognized_text.json", "utf-8"));

console.log("开始生成整齐排版的PPT...");

// 创建每一页幻灯片
for (let slideNum = 1; slideNum <= 31; slideNum++) {
    console.log("生成第 " + slideNum + " 页...");
    
    const slide = pptx.addSlide();
    
    // 添加背景图片
    const imgPath = path.join(imagesDir, "image_" + slideNum + ".jpg");
    if (fs.existsSync(imgPath)) {
        slide.addImage({
            path: imgPath,
            x: 0,
            y: 0,
            w: 13.33,
            h: 7.5
        });
    }
    
    // 获取文字内容
    const text = textData[slideNum.toString()] || "";
    const lines = text.split("\n");
    
    // 第一行作为标题
    const title = lines[0] || "";
    const content = lines.slice(1).join("\n").trim();
    
    // 添加标题文本框（带阴影效果）
    if (title) {
        slide.addText(title, {
            x: 0.5,
            y: 0.3,
            w: 12.33,
            h: 0.8,
            fontSize: 32,
            fontFace: "Microsoft YaHei",
            color: "333333",
            bold: true,
            align: "center",
            valign: "middle",
            fill: {
                type: "solid",
                color: "FFFFFF",
                transparency: 70
            },
            margin: 0
        });
    }
    
    // 添加内容文本框
    if (content) {
        // 处理内容，改进格式
        const formattedContent = content
            .replace(/•/g, "●")  // 统一项目符号
            .replace(/--/g, "—")   // 转换破折号
            .replace(/\s+/g, " "); // 清理多余空格
        
        slide.addText(formattedContent, {
            x: 0.7,
            y: 1.2,
            w: 11.93,
            h: 5.3,
            fontSize: 18,
            fontFace: "Microsoft YaHei",
            color: "333333",
            valign: "top",
            align: "left",
            fill: {
                type: "solid",
                color: "FFFFFF",
                transparency: 80
            },
            lineSpaceMult: 1.5,  // 1.5倍行距
            margin: 10
        });
    }
    
    // 添加页码
    slide.addText("第 " + slideNum + " 页", {
        x: 11.5,
        y: 7.1,
        w: 1.5,
        h: 0.3,
        fontSize: 10,
        fontFace: "Arial",
        color: "666666",
        align: "right",
        valign: "middle",
        fill: {
            type: "solid",
            color: "FFFFFF",
            transparency: 90
        }
    });
}

// 保存文件
const outputPath = "c:\\AI学习资料\\mesheer\\vpp_presentation\\虚拟电厂_整齐排版版.pptx";
pptx.writeFile({ fileName: outputPath })
    .then(() => {
        console.log("");
        console.log("✓ PPT生成成功！");
        console.log("文件位置: " + outputPath);
        console.log("");
        console.log("说明：");
        console.log("- 采用16:9宽屏比例");
        console.log("- 统一使用微软雅黑字体");
        console.log("- 适当的行距和边距");
        console.log("- 文字使用半透明背景确保可读性");
    })
    .catch(err => {
        console.error("生成失败:", err);
    });
