import { useState, useCallback } from 'react';
import { Upload, FileText, FileImage, FileSpreadsheet, FileCode, Trash2, CheckCircle, Loader2 } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'uploading' | 'uploaded' | 'error';
  progress: number;
  message?: string;
}

const fileIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  doc: FileText,
  docx: FileText,
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  ppt: FileText,
  pptx: FileText,
  txt: FileCode,
  image: FileImage,
  default: FileText
};

const fileColors: Record<string, string> = {
  pdf: 'bg-red-100 text-red-600',
  doc: 'bg-blue-100 text-blue-600',
  docx: 'bg-blue-100 text-blue-600',
  xls: 'bg-green-100 text-green-600',
  xlsx: 'bg-green-100 text-green-600',
  ppt: 'bg-orange-100 text-orange-600',
  pptx: 'bg-orange-100 text-orange-600',
  txt: 'bg-gray-100 text-gray-600',
  image: 'bg-purple-100 text-purple-600',
  default: 'bg-gray-100 text-gray-600'
};

interface FileUploaderProps {
  onFilesUploaded?: (files: File[]) => void;
  acceptedTypes?: string[];
  maxFileSize?: number;
}

export default function FileUploader({ onFilesUploaded, acceptedTypes = [], maxFileSize = 50 * 1024 * 1024 }: FileUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const getFileExtension = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase() || 'default';
    return ext;
  };

  const getFileIcon = (filename: string) => {
    const ext = getFileExtension(filename);
    const icon = fileIcons[ext] || fileIcons.default;
    const color = fileColors[ext] || fileColors.default;
    return { Icon: icon, color };
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  }, []);

  const processFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.type,
      size: file.size,
      status: 'uploading',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach((file, index) => {
      if (files[index].size > maxFileSize) {
        setUploadedFiles(prev => prev.map(f =>
          f.id === file.id ? { ...f, status: 'error' as const, message: '文件大小超过限制', progress: 0 } : f
        ));
        return;
      }

      if (acceptedTypes.length > 0 && !acceptedTypes.some(type => files[index].name.toLowerCase().endsWith(type))) {
        setUploadedFiles(prev => prev.map(f =>
          f.id === file.id ? { ...f, status: 'error' as const, message: '文件格式不支持', progress: 0 } : f
        ));
        return;
      }

      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => {
          if (f.id === file.id) {
            const newProgress = f.progress + Math.random() * 20;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, progress: 100, status: 'uploaded' as const };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 300);

      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(f =>
          f.id === file.id ? { ...f, progress: 100, status: 'uploaded' as const } : f
        ));
        onFilesUploaded?.(files);
      }, 2000);
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const clearAll = () => {
    setUploadedFiles([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">文件上传</h3>
        {uploadedFiles.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            清空全部
          </button>
        )}
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
        <div className="flex flex-col items-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isDragging ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            <Upload className="w-8 h-8" />
          </div>
          <p className="text-gray-600 font-medium mb-2">
            {isDragging ? '释放文件以上传' : '点击或拖拽文件到此处'}
          </p>
          <p className="text-sm text-gray-400">
            支持 PDF、Word、Excel、PPT、TXT 等格式，单文件最大 50MB
          </p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          {uploadedFiles.map(file => {
            const { Icon, color } = getFileIcon(file.name);
            return (
              <div key={file.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800 truncate">{file.name}</span>
                    <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        file.status === 'uploading' ? 'bg-blue-500' :
                        file.status === 'uploaded' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    {file.status === 'uploading' && (
                      <span className="text-xs text-blue-500 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        上传中...
                      </span>
                    )}
                    {file.status === 'uploaded' && (
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        上传成功
                      </span>
                    )}
                    {file.status === 'error' && (
                      <span className="text-xs text-red-500">{file.message}</span>
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}