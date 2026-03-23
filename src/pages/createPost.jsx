import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import usePostsStore from '../stores/usePostStore'

function CreatePost() {
  const { createPost } = usePostsStore()
  const navigate = useNavigate()

  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const [mediaUrl, setMediaUrl] = useState(null)
  const [mediaType, setMediaType] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fileInputRef = useRef(null)

  function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')

    if (isImage) setMediaType('image')
    if (isVideo) setMediaType('video')

    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)
    setMediaUrl(localUrl)
  }

  async function handleSubmit() {
    if (!body.trim()) return alert('Post cannot be empty!')

    setIsLoading(true)

    try {
      await createPost({
        body,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        mediaUrl,
        mediaType,
      })
      navigate('/')
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="text-gray-500 hover:text-gray-800">
          <span className="material-icons">arrow_back</span>
        </Link>
        <h2 className="text-lg font-bold text-gray-800">Create Post</h2>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 max-w-lg mx-auto">

        {/* Body */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your knowledge..."
          rows={5}
          className="w-full text-gray-800 text-base resize-none outline-none placeholder-gray-400"
        />

        {/* Media Preview */}
        {preview && (
          <div className="mt-3 rounded-xl overflow-hidden">
            {mediaType === 'image' && (
              <img src={preview} alt="preview" className="w-full max-h-64 object-cover" />
            )}
            {mediaType === 'video' && (
              <video src={preview} controls className="w-full max-h-64" />
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">

          {/* Left actions */}
          <div className="flex items-center gap-3">
            {/* File upload */}
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-blue-600 hover:text-blue-700"
            >
              <span className="material-icons">photo_camera</span>
            </button>
            <input
              type="file"
              accept="image/*,video/*"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Tags */}
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add tags..."
              className="text-sm text-gray-500 outline-none placeholder-gray-400 w-36"
            />
          </div>

          {/* Post button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default CreatePost