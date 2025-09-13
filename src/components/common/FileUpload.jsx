import React, { useState, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const FileUpload = ({ onFileUpload, acceptedTypes = ['.csv', '.json'] }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parsingStep, setParsingStep] = useState('');
  const { isDark } = useTheme();

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    setUploadStatus(null);
    setUploadProgress(0);
    setParsingStep('');

    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      setUploadStatus({
        type: 'error',
        message: `Invalid file type. Please upload a ${acceptedTypes.join(
          ' or '
        )} file.`,
      });
      setIsUploading(false);
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadStatus({
        type: 'error',
        message: 'File size too large. Please upload a file smaller than 10MB.',
      });
      setIsUploading(false);
      return;
    }

    try {
      // Simulate file processing with progress updates
      setParsingStep('Reading file...');
      setUploadProgress(20);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setParsingStep('Validating format...');
      setUploadProgress(40);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setParsingStep('Parsing data...');
      setUploadProgress(60);
      const content = await readFileContent(file);

      setParsingStep('Processing records...');
      setUploadProgress(80);
      const parsedData = parseFileContent(content, fileExtension);

      setParsingStep('Finalizing...');
      setUploadProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 200));

      setUploadStatus({
        type: 'success',
        message: `File "${file.name}" uploaded successfully! ${parsedData.length} records processed.`,
      });

      // Call the parent component's upload handler
      if (onFileUpload) {
        onFileUpload({
          file,
          data: parsedData,
          metadata: {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            recordCount: parsedData.length,
            columns: parsedData.length > 0 ? Object.keys(parsedData[0]) : [],
          },
        });
      }
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: `Error processing file: ${error.message}`,
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setParsingStep('');
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const parseFileContent = (content, fileExtension) => {
    if (fileExtension === '.json') {
      try {
        const jsonData = JSON.parse(content);
        return Array.isArray(jsonData) ? jsonData : [jsonData];
      } catch (error) {
        throw new Error('Invalid JSON format');
      }
    } else if (fileExtension === '.csv') {
      try {
        const lines = content.split('\n').filter((line) => line.trim());
        if (lines.length < 2) {
          throw new Error(
            'CSV file must have at least a header and one data row'
          );
        }

        const headers = lines[0].split(',').map((header) => header.trim());
        const data = lines.slice(1).map((line) => {
          const values = line.split(',').map((value) => value.trim());
          const row = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          return row;
        });

        return data;
      } catch (error) {
        throw new Error('Invalid CSV format');
      }
    }
    return [];
  };

  const resetUpload = () => {
    setUploadStatus(null);
    setIsUploading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
          ${
            isDragOver
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${isUploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                {parsingStep}
              </p>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {uploadProgress}% complete
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Drop your file here, or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Supports {acceptedTypes.join(', ')} files up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {uploadStatus && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            uploadStatus.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-center">
            <div
              className={`flex-shrink-0 w-5 h-5 ${
                uploadStatus.type === 'success'
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {uploadStatus.type === 'success' ? (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  uploadStatus.type === 'success'
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}
              >
                {uploadStatus.message}
              </p>
            </div>
            <div className="ml-auto">
              <button
                onClick={resetUpload}
                className={`text-sm font-medium ${
                  uploadStatus.type === 'success'
                    ? 'text-green-600 dark:text-green-400 hover:text-green-500'
                    : 'text-red-600 dark:text-red-400 hover:text-red-500'
                }`}
              >
                Upload Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
