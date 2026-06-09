const PptxGenJS = require("pptxgenjs");
const fs = require("fs");

// 创建演示文稿
const pptx = new PptxGenJS();

// 设置16:9宽屏布局
pptx.layout = "LAYOUT_WIDE";

console.log("开始创建《虚拟电厂发展模式与技术形态思考》PPT...");

// 定义主题颜色
const primaryColor = "00509E";   // 南方电网蓝
const secondaryColor = "0078D4"; // 微软蓝
const accentColor = "FFB800";    // 橙色
const textColor = "333333";
const lightColor = "FFFFFF";

// ========== 幻灯片1: 封面 ==========
{
    const slide = pptx.addSlide();
    
    // 背景渐变
    slide.background = { color: primaryColor };
    
    // 标题
    slide.addText("虚拟电厂发展模式与", {
        x: 1, y: 2, w: 11.33, h: 0.8,
        fontSize: 40,
        fontFace: "Microsoft YaHei",
        color: lightColor,
        bold: true,
        align: "center"
    });
    
    slide.addText("技术形态思考", {
        x: 1, y: 2.9, w: 11.33, h: 0.8,
        fontSize: 48,
        fontFace: "Microsoft YaHei",
        color: lightColor,
        bold: true,
        align: "center"
    });
    
    slide.addText("南方电网", {
        x: 1, y: 4.5, w: 11.33, h: 0.5,
        fontSize: 24,
        fontFace: "Microsoft YaHei",
        color: "DDDDDD",
        align: "center"
    });
}

// ========== 幻灯片2: 目录 ==========
{
    const slide = pptx.addSlide();
    
    // 标题
    slide.addText("目录", {
        x: 0.5, y: 0.4, w: 12.33, h: 0.8,
        fontSize: 36,
        fontFace: "Microsoft YaHei",
        color: primaryColor,
        bold: true
    });
    
    // 分隔线
    slide.addShape(pptx.ShapeType.line, {
        x: 0.5, y: 1.3, w: 12.33, h: 0,
        line: { color: secondaryColor, width: 3 }
    });
    
    // 目录内容
    const items = [
        "一、虚拟电厂概述与发展背景",
        "二、虚拟电厂发展模式",
        "三、虚拟电厂技术架构与关键技术",
        "四、南方电网实践案例",
        "五、未来发展趋势与挑战"
    ];
    
    items.forEach((item, index) => {
        slide.addText(item, {
            x: 1.5, y: 1.8 + index * 0.9, w: 10, h: 0.7,
            fontSize: 22,
            fontFace: "Microsoft YaHei",
            color: textColor,
            bullet: { indent: 18, hanging: 9 }
        });
    });
}

// ========== 幻灯片3: 虚拟电厂概述 ==========
{
    const slide = pptx.addSlide();
    
    slide.addText("一、虚拟电厂概述与发展背景", {
        x: 0.5, y: 0.4, w: 12.33, h: 0.7,
        fontSize: 32,
        fontFace: "Microsoft YaHei",
        color: primaryColor,
        bold: true
    });
    
    slide.addShape(pptx.ShapeType.line, {
        x: 0.5, y: 1.2, w: 12.33, h: 0,
        line: { color: secondaryColor, width: 2 }
    });
    
    slide.addText("什么是虚拟电厂？", {
        x: 0.8, y: 1.4, w: 11.53, h: 0.6,
        fontSize: 24,
        fontFace: "Microsoft YaHei",
        color: secondaryColor,
        bold: true
    });
    
    const desc = "虚拟电厂（Virtual Power Plant, VPP）是一种通过先进信息通信技术和软件系统，实现分布式电源、储能系统、可控负荷、电动汽车等分布式资源的聚合和协调优化，作为一个特殊电厂参与电力市场和电网运行的电源协调管理系统。";
    slide.addText(desc, {
        x: 1, y: 2.2, w: 11.33, h: 2,
        fontSize: 20,
        fontFace: "Microsoft YaHei",
        color: textColor,
        lineSpaceMult: 1.5,
        margin: 10
    });
}

// ========== 幻灯片4: 发展背景 ==========
{
    const slide = pptx.addSlide();
    
    slide.addText("发展背景与驱动力", {
        x: 0.5, y: 0.4, w: 12.33, h: 0.7,
        fontSize: 32,
        fontFace: "Microsoft YaHei",
        color: primaryColor,
        bold: true
    });
    
    slide.addShape(pptx.ShapeType.line, {
        x: 0.5, y: 1.2, w: 12.33, h: 0,
        line: { color: secondaryColor, width: 2 }
    });
    
    const drivers = [
        { icon: "🔋", title: "新能源大规模接入", desc: "风电、光伏等新能源装机快速增长，需要灵活调节资源" },
        { icon: "⚡", title: "电力系统灵活性需求", desc: "新型电力系统对调峰、调频能力提出更高要求" },
        { icon: "📊", title: "电力市场改革", desc: "市场化机制逐步完善，为虚拟电厂提供商业模式" },
        { icon: "🏠", title: "用户侧参与度提升", desc: "分布式能源发展，用户从消费者向产消者转变" }
    ];
    
    drivers.forEach((driver, index) => {
        const x = index < 2 ? 0.8 : 7;
        const y = index % 2 === 0 ? 1.6 : 4;
        
        slide.addShape(pptx.ShapeType.roundRect, {
            x: x, y: y, w: 5.8, h: 2.2,
            fill: { type: "solid", color: "F0F7FF" },
            line: { color: secondaryColor, width: 1 }
        });
        
        slide.addText(driver.icon + "  " + driver.title, {
            x: x + 0.3, y: y + 0.2, w: 5.2, h: 0.5,
            fontSize: 20,
            fontFace: "Microsoft YaHei",
            color: secondaryColor,
            bold: true
        });
        
        slide.addText(driver.desc, {
            x: x + 0.4, y: y + 0.8, w: 5.0, h: 1.2,
            fontSize: 18,
            fontFace: "Microsoft YaHei",
            color: textColor,
            lineSpaceMult: 1.4
        });
    });
}

// ========== 幻灯片5: 发展模式 ==========
{
    const slide = pptx.addSlide();
    
    slide.addText("二、虚拟电厂发展模式", {
        x: 0.5, y: 0.4, w: 12.33, h: 0.7,
        fontSize: 32,
        fontFace: "Microsoft YaHei",
        color: primaryColor,
        bold: true
    });
    
    slide.addShape(pptx.ShapeType.line, {
        x: 0.5, y: 1.2, w: 12.33, h: 0,
        line: { color: secondaryColor, width: 2 }
    });
    
    const modes = [
        { name: "电网调度型", desc: "以电网安全运行为目标，提供调峰、调频、调压等辅助服务" },
        { name: "市场交易型", desc: "参与电力市场交易，通过套利实现经济效益最大化" },
        { name: "用户侧需求响应型", desc: "整合用户侧资源，参与需求响应项目获取收益" },
        { name: "综合能源服务型", desc: "提供冷热电综合能源服务，满足用户多元用能需求" }
    ];
    
    modes.forEach((mode, index) => {
        slide.addShape(pptx.ShapeType.ellipse, {
            x: 0.8, y: 1.6 + index * 1.3, w: 0.6, h: 0.6,
            fill: { type: "solid", color: primaryColor }
        });
        
        slide.addText(mode.name, {
            x: 1.6, y: 1.55 + index * 1.3, w: 3.5, h: 0.6,
            fontSize: 22,
            fontFace: "Microsoft YaHei",
            color: primaryColor,
            bold: true
        });
        
        slide.addText(mode.desc, {
            x: 5, y: 1.65 + index * 1.3, w: 7.33, h: 1.1,
            fontSize: 19,
            fontFace: "Microsoft YaHei",
            color: textColor
        });
    });
}

// ========== 幻灯片6: 技术架构 ==========
{
    const slide = pptx.addSlide();
    
    slide.addText("三、虚拟电厂技术架构", {
        x: 0.5, y: 0.4, w: 12.33, h: 0.7,
        fontSize: 32,
        fontFace: "Microsoft YaHei",
        color: primaryColor,
        bold: true
    });
    
    slide.addShape(pptx.ShapeType.line, {
        x: 0.5, y: 1.2, w: 12.33, h: 0,
        line: { color: secondaryColor, width: 2 }
    });
    
    // 架构框图
    const layers = [
        { name: "应用层", items: ["电力市场", "电网调度", "用户服务"], y: 1.4, color: "E6F3FF" },
        { name: "平台层", items: ["协调控制", "优化调度", "数据分析"], y: 2.7, color: "CCE8FF" },
        { name: "网络层", items: ["通信网络", "物联网", "互联网"], y: 4, color: "B3DDFF" },
        { name: "设备层", items: ["分布式电源", "储能系统", "可控负荷"], y: 5.3, color: "99D1FF" }
    ];
    
    layers.forEach((layer, index) => {
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 2.5, y: layer.y, w: 8.33, h: 1.1,
            fill: { type: "solid", color: layer.color },
            line: { color: secondaryColor, width: 2 }
        });
        
        slide.addText(layer.name, {
            x: 0.8, y: layer.y + 0.1, w: 1.5, h: 0.9,
            fontSize: 24,
            fontFace: "Microsoft YaHei",
            color: primaryColor,
            bold: true,
            align: "center",
            valign: "middle"
        });
        
        slide.addText(layer.items.join("  |  "), {
            x: 3, y: layer.y + 0.1, w: 7.33, h: 0.9,
            fontSize: 22,
            fontFace: "Microsoft YaHei",
            color: textColor,
            align: "center",
            valign: "middle"
        });
    });
}

// ========== 幻灯片7: 关键技术 ==========
{
    const slide = pptx.addSlide();
    
    slide.addText("关键技术", {
        x: 0.5, y: 0.4, w: 12.33, h: 0.7,
        fontSize: 32,
        fontFace: "Microsoft YaHei",
        color: primaryColor,
        bold: true
    });
    
    slide.addShape(pptx.ShapeType.line, {
        x: 0.5, y: 1.2, w: 12.33, h: 0,
        line: { color: secondaryColor, width: 2 }
    });
    
    const techs = [
        { title: "数据采集与监控技术", desc: "实时采集各类分布式能源运行数据，实现全景感知" },
        { title: "分布式协调控制技术", desc: "实现海量分布式资源的协调控制与优化运行" },
        { title: "智能优化算法", desc: "应用人工智能、运筹优化等技术实现最优决策" },
        { title: "预测技术", desc: "负荷预测、发电预测、电价预测等，为决策提供支撑" },
        { title: "区块链与安全技术", desc: "保障交易透明、数据安全与可信" }
    ];
    
    techs.forEach((tech, index) => {
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 0.8, y: 1.5 + index * 1.1, w: 11.73, h: 0.95,
            fill: { type: "solid", color: index % 2 === 0 ? "F8F8F8" : "FFFFFF" },
            line: { color: "E0E0E0", width: 1 }
        });
        
        slide.addText("● " + tech.title, {
            x: 1, y: 1.55 + index * 1.1, w: 3.5, h: 0.85,
            fontSize: 20,
            fontFace: "Microsoft YaHei",
            color: secondaryColor,
            bold: true,
            valign: "middle"
        });
        
        slide.addText(tech.desc, {
            x: 4.8, y: 1.6 + index * 1.1, w: 7.53, h: 0.75,
            fontSize: 18,
            fontFace: "Microsoft YaHei",
            color: textColor,
            valign: "middle"
        });
    });
}

// ========== 幻灯片8: 南方电网实践 ==========
{
    const slide = pptx.addSlide();
    
    slide.addText("四、南方电网实践案例", {
        x: 0.5, y: 0.4, w: 12.33, h: 0.7,
        fontSize: 32,
        fontFace: "Microsoft YaHei",
        color: primaryColor,
        bold: true
    });
    
    slide.addShape(pptx.ShapeType.line, {
        x: 0.5, y: 1.2, w: 12.33, h: 0,
        line: { color: secondaryColor, width: 2 }
    });
    
    const practices = [
        { title: "项目背景", text: "落实国家'双碳'战略，促进新能源消纳，提升电力系统灵活性" },
        { title: "建设目标", text: "聚合分布式资源，形成可观可控的虚拟电厂，参与电力市场，支撑电网安全" },
        { title: "技术方案", text: "采用云边端协同架构，实现多能互补协同优化，建立市场化运营机制" },
        { title: "项目成效", text: "有效提升新能源消纳能力，提供电网调峰支持，探索商业可持续模式" }
    ];
    
    practices.forEach((item, index) => {
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 1, y: 1.5 + index * 1.3, w: 11.33, h: 1.15,
            fill: { type: "solid", color: "FFFAF0" },
            line: { color: accentColor, width: 1 }
        });
        
        slide.addText("[" + item.title + "]", {
            x: 1.3, y: 1.55 + index * 1.3, w: 2.5, h: 0.45,
            fontSize: 20,
            fontFace: "Microsoft YaHei",
            color: accentColor,
            bold: true
        });
        
        slide.addText(item.text, {
            x: 4, y: 1.55 + index * 1.3, w: 8.0, h: 1.05,
            fontSize: 19,
            fontFace: "Microsoft YaHei",
            color: textColor,
            lineSpaceMult: 1.4
        });
    });
}

// ========== 幻灯片9: 未来展望 ==========
{
    const slide = pptx.addSlide();
    
    slide.addText("五、未来发展趋势与挑战", {
        x: 0.5, y: 0.4, w: 12.33, h: 0.7,
        fontSize: 32,
        fontFace: "Microsoft YaHei",
        color: primaryColor,
        bold: true
    });
    
    slide.addShape(pptx.ShapeType.line, {
        x: 0.5, y: 1.2, w: 12.33, h: 0,
        line: { color: secondaryColor, width: 2 }
    });
    
    // 两栏布局
    slide.addText("发展趋势", {
        x: 0.8, y: 1.4, w: 5.8, h: 0.55,
        fontSize: 24,
        fontFace: "Microsoft YaHei",
        color: primaryColor,
        bold: true,
        fill: { type: "solid", color: "F0F7FF" },
        margin: 10
    });
    
    slide.addText("• 规模持续扩大，覆盖范围更广\n• 技术不断进步，智能化水平提升\n• 商业模式创新，多元化发展\n• 标准化程度提高，规范发展", {
        x: 1, y: 2.1, w: 5.6, h: 4,
        fontSize: 20,
        fontFace: "Microsoft YaHei",
        color: textColor,
        lineSpaceMult: 1.7
    });
    
    slide.addText("挑战", {
        x: 6.93, y: 1.4, w: 5.6, h: 0.55,
        fontSize: 24,
        fontFace: "Microsoft YaHei",
        color: accentColor,
        bold: true,
        fill: { type: "solid", color: "FFF5E6" },
        margin: 10
    });
    
    slide.addText("• 技术标准体系有待完善\n• 市场机制需要进一步健全\n• 用户认知与参与度待提升\n• 数据安全与隐私保护", {
        x: 7.13, y: 2.1, w: 5.4, h: 4,
        fontSize: 20,
        fontFace: "Microsoft YaHei",
        color: textColor,
        lineSpaceMult: 1.7
    });
}

// ========== 幻灯片10: 总结 ==========
{
    const slide = pptx.addSlide();
    
    slide.background = { color: primaryColor };
    
    slide.addText("总结", {
        x: 1, y: 1, w: 11.33, h: 0.8,
        fontSize: 44,
        fontFace: "Microsoft YaHei",
        color: lightColor,
        bold: true,
        align: "center"
    });
    
    slide.addText("虚拟电厂是构建新型电力系统的重要支撑", {
        x: 1.5, y: 2.2, w: 10.33, h: 0.6,
        fontSize: 26,
        fontFace: "Microsoft YaHei",
        color: "E0E0E0",
        align: "center"
    });
    
    slide.addText("南方电网将持续探索与实践，推动虚拟电厂健康发展", {
        x: 1.5, y: 3, w: 10.33, h: 0.6,
        fontSize: 26,
        fontFace: "Microsoft YaHei",
        color: "E0E0E0",
        align: "center"
    });
}

// ========== 幻灯片11: 结束页 ==========
{
    const slide = pptx.addSlide();
    
    slide.background = { color: primaryColor };
    
    slide.addText("感谢聆听", {
        x: 1, y: 2.5, w: 11.33, h: 1,
        fontSize: 56,
        fontFace: "Microsoft YaHei",
        color: lightColor,
        bold: true,
        align: "center"
    });
    
    slide.addText("南方电网 · 虚拟电厂", {
        x: 1, y: 3.8, w: 11.33, h: 0.6,
        fontSize: 24,
        fontFace: "Microsoft YaHei",
        color: "DDDDDD",
        align: "center"
    });
}

// 保存文件
const outputPath = "c:\\AI学习资料\\mesheer\\vpp_presentation\\虚拟电厂发展模式与技术形态思考.pptx";
pptx.writeFile({ fileName: outputPath })
    .then(() => {
        console.log("\n✓ PPT生成成功！");
        console.log("文件位置: " + outputPath);
        console.log("\n说明：");
        console.log("- 采用16:9宽屏布局");
        console.log("- 专业的配色方案（南方电网蓝）");
        console.log("- 整齐的排版与合理的间距");
        console.log("- 统一字体（微软雅黑）");
        console.log("- 11页完整内容");
    })
    .catch(err => {
        console.error("生成失败:", err);
    });
