import { useState, useCallback, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2, FolderOpen, Lock, Clock, User, Building } from 'lucide-react';

interface InternalFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadTime: string;
  uploader: string;
  department: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
  securityLevel: 'public' | 'internal' | 'confidential';
  category: string;
}

const fileCategories = [
  { id: 'strategy', name: '战略规划', icon: '📊' },
  { id: 'report', name: '研究报告', icon: '📑' },
  { id: 'meeting', name: '会议纪要', icon: '📝' },
  { id: 'notice', name: '通知公告', icon: '📢' },
  { id: 'contract', name: '合同协议', icon: '📜' },
  { id: 'other', name: '其他文件', icon: '📁' }
];

const mockInternalFiles: InternalFile[] = [
  {
    id: 'int-001',
    name: '集团2024年度战略规划报告.pdf',
    type: 'PDF',
    size: 2.5 * 1024 * 1024,
    uploadTime: '2024-03-25 14:30',
    uploader: '张明',
    department: '战略发展部',
    status: 'completed',
    progress: 100,
    securityLevel: 'confidential',
    category: 'strategy'
  },
  {
    id: 'int-002',
    name: '新能源项目投资分析报告.docx',
    type: 'Word',
    size: 1.8 * 1024 * 1024,
    uploadTime: '2024-03-24 10:15',
    uploader: '李华',
    department: '投资管理部',
    status: 'completed',
    progress: 100,
    securityLevel: 'internal',
    category: 'report'
  },
  {
    id: 'int-003',
    name: '董事会会议纪要（2024年3月）.docx',
    type: 'Word',
    size: 520 * 1024,
    uploadTime: '2024-03-23 16:45',
    uploader: '王芳',
    department: '董事会办公室',
    status: 'completed',
    progress: 100,
    securityLevel: 'confidential',
    category: 'meeting'
  },
  {
    id: 'int-004',
    name: '关于开展安全生产大检查的通知.pdf',
    type: 'PDF',
    size: 340 * 1024,
    uploadTime: '2024-03-22 09:00',
    uploader: '刘强',
    department: '安全监察部',
    status: 'completed',
    progress: 100,
    securityLevel: 'public',
    category: 'notice'
  }
];

export default function InternalFileUploader() {
  const [files, setFiles] = useState<InternalFile[]>(mockInternalFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterSecurity, setFilterSecurity] = useState<string>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getSecurityBadge = (level: string) => {
    switch (level) {
      case 'confidential':
        return { bg: 'bg-red-100 text-red-800', icon: Lock, label: '机密' };
      case 'internal':
        return { bg: 'bg-yellow-100 text-yellow-800', icon: FolderOpen, label: '内部' };
      case 'public':
        return { bg: 'bg-green-100 text-green-800', icon: User, label: '公开' };
      default:
        return { bg: 'bg-gray-100 text-gray-800', icon: FolderOpen, label: '普通' };
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = fileCategories.find(c => c.id === categoryId);
    return category?.icon || '📁';
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    simulateUpload(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    simulateUpload(selectedFiles);
  }, []);

  const simulateUpload = (newFiles: File[]) => {
    const uploadedFiles: InternalFile[] = newFiles.map((file, index) => ({
      id: `int-${Date.now()}-${index}`,
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
      size: file.size,
      uploadTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      uploader: '当前用户',
      department: '战略发展部',
      status: 'uploading',
      progress: 0,
      securityLevel: 'internal' as const,
      category: 'other'
    }));

    setFiles(prev => [...uploadedFiles, ...prev]);

    uploadedFiles.forEach(uploadedFile => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles(prev => prev.map(f => 
            f.id === uploadedFile.id ? { ...f, status: 'completed' as const, progress: 100 } : f
          ));
        } else {
          setFiles(prev => prev.map(f => 
            f.id === uploadedFile.id ? { ...f, progress } : f
          ));
        }
      }, 300);
    });
  };

  const filteredFiles = files.filter(file => {
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    const matchesSecurity = filterSecurity === 'all' || file.securityLevel === filterSecurity;
    return matchesCategory && matchesSecurity;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">内部文件上传</h3>
              <p className="text-sm text-gray-500">上传和管理集团内部政策研究文件</p>
            </div>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>上传文件</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
          />
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
            isDragging ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-gray-600 font-medium mb-1">
            {isDragging ? '释放文件以上传' : '拖拽文件到此处，或点击上传'}
          </p>
          <p className="text-sm text-gray-400">
            支持 PDF、Word、Excel、PPT 格式，可设置密级和分类
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">内部文件库</h3>
          <div className="flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部分类</option>
              {fileCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
            <select
              value={filterSecurity}
              onChange={(e) => setFilterSecurity(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部密级</option>
              <option value="confidential">机密</option>
              <option value="internal">内部</option>
              <option value="public">公开</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredFiles.map(file => {
            const securityBadge = getSecurityBadge(file.securityLevel);
            const SecurityIcon = securityBadge.icon;
            
            return (
              <div key={file.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                    file.type === 'PDF' ? 'bg-red-100' :
                    file.type === 'Word' ? 'bg-blue-100' :
                    file.type === 'Excel' ? 'bg-green-100' :
                    'bg-gray-100'
                  }`}>
                    {getCategoryIcon(file.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 ${securityBadge.bg}`}>
                            <SecurityIcon className="w-3 h-3" />
                            {securityBadge.label}
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs bg-gray-200 text-gray-600">
                            {fileCategories.find(c => c.id === file.category)?.name || '其他'}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-800">{file.name}</h4>
                      </div>
                      <button
                        onClick={() => setFiles(prev => prev.filter(f => f.id !== file.id))}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {file.status === 'uploading' && (
                      <div className="mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="h-1.5 bg-blue-500 rounded-full transition-all"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-blue-600">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>上传中 {Math.round(file.progress)}%</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {file.uploader}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {file.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {file.uploadTime}
                      </span>
                      <span>{formatFileSize(file.size)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无符合条件的文件</p>
          </div>
        )}
      </div>
    </div>
  );
}