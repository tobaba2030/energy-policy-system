# Docker 和 Rust 安装指南 (Windows)

## 一、安装 Docker Desktop for Windows

### 1. 系统要求
- Windows 10 64 位：专业版、企业版或教育版（版本 1903 或更高，Build 18362 或更高）
- Windows 11 64 位：家庭版、专业版、企业版或教育版
- 启用 WSL 2 功能
- BIOS 级硬件虚拟化支持
- 至少 4GB RAM

### 2. 安装步骤

#### 步骤 1：下载 Docker Desktop
访问 Docker 官网下载页面：
https://www.docker.com/products/docker-desktop/

下载 Windows 版本的安装程序。

#### 步骤 2：安装 Docker Desktop
1. 运行下载的安装程序 `Docker Desktop Installer.exe`
2. 在安装向导中，确保勾选 "Use WSL 2 instead of Hyper-V"（如果可用）
3. 点击 "OK" 开始安装
4. 安装完成后，点击 "Close and restart" 重启电脑

#### 步骤 3：首次运行 Docker Desktop
1. 重启后，从开始菜单启动 Docker Desktop
2. 接受服务协议
3. Docker Desktop 会自动启动并在系统托盘中显示鲸鱼图标
4. 等待图标稳定（不再闪烁），表示 Docker 已就绪

#### 步骤 4：验证安装
打开 PowerShell 或命令提示符，运行：
```powershell
docker --version
docker run hello-world
```

---

## 二、安装 Rust

### 1. 下载和安装 Rustup

#### 方法一：使用官方安装脚本（推荐）
1. 访问 Rust 官网：https://www.rust-lang.org/tools/install
2. 下载并运行 `rustup-init.exe`
3. 在安装过程中，选择默认选项（按 1 回车）
4. 安装完成后，重启终端或重新登录

#### 方法二：使用包管理器
如果您有 Chocolatey 或 Scoop，可以使用：
- Chocolatey: `choco install rust`
- Scoop: `scoop install rust`

### 2. 配置环境变量
安装程序应该会自动配置环境变量。如果没有，需要手动添加：
- 将 `%USERPROFILE%\.cargo\bin` 添加到 PATH 环境变量中

### 3. 验证安装
打开新的 PowerShell 窗口，运行：
```powershell
rustc --version
cargo --version
rustup --version
```

### 4. 配置 Rust 工具链（可选）
```powershell
# 更新 Rust
rustup update

# 安装 nightly 版本（可选）
rustup install nightly

# 设置默认工具链
rustup default stable
```

---

## 三、验证完整安装

安装完成后，在 PowerShell 中运行以下命令验证：

```powershell
# 检查 Docker
docker --version
docker info

# 检查 Rust
rustc --version
cargo --version

# 运行一个简单的 Rust 程序测试
echo 'fn main() { println!("Hello, Rust!"); }' > hello.rs
rustc hello.rs
.\hello.exe
```

---

## 四、常见问题解决

### Docker 问题
- 如果 Docker Desktop 无法启动，请确保 WSL 2 已启用
- 在 PowerShell 中运行：`wsl --list --verbose` 检查 WSL 状态
- 如需安装 WSL 2：`wsl --install`

### Rust 问题
- 如果 `rustc` 命令无法识别，请重启终端或重新登录
- 检查 PATH 环境变量是否包含 `%USERPROFILE%\.cargo\bin`

---

## 五、下一步

安装完成后，您可以：
- 学习 Rust：https://doc.rust-lang.org/book/
- 探索 Docker：https://docs.docker.com/get-started/
