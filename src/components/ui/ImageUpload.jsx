import React, { useState, useRef } from 'react'
import Card from './Card'

const ImageUpload = ({ 
  images = [], 
  onImagesChange, 
  maxImages = 5, 
  className = '' 
}) => {
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (files) => {
    const newImages = Array.from(files).slice(0, maxImages - images.length)
    const imageUrls = newImages.map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }))
    
    onImagesChange([...images, ...imageUrls])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const handleFileInput = (e) => {
    handleFileSelect(e.target.files)
  }

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        <i className="fas fa-camera text-primary-600 mr-2"></i>
        Item Photos ({images.length}/{maxImages})
      </label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Existing Images */}
        {images.map((image, index) => (
          <Card key={image.id || index} className="relative group overflow-hidden">
            <img
              src={image.url}
              alt={`Upload ${index + 1}`}
              className="w-full h-32 object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <i className="fas fa-times text-xs"></i>
            </button>
            {index === 0 && (
              <div className="absolute bottom-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
                Main
              </div>
            )}
          </Card>
        ))}
        
        {/* Upload Area */}
        {images.length < maxImages && (
          <Card
            className={`
              h-32 border-2 border-dashed cursor-pointer transition-all duration-200
              ${dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
            `}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <i className="fas fa-plus text-2xl mb-2"></i>
              <p className="text-xs text-center">
                {images.length === 0 ? 'Add Main Photo' : 'Add Photo'}
              </p>
            </div>
          </Card>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <p className="text-xs text-gray-500 mt-2">
        PNG, JPG, GIF up to 10MB each. First image will be the main photo.
      </p>
    </div>
  )
}

export default ImageUpload