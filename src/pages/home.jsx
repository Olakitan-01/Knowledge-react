import { useEffect } from 'react'
import usePostsStore from '../stores/usePostStore'
import PostCard from '../components/postCard'

function Home() {
  const { posts, hasMore, fetchPosts, loadMore } = usePostsStore()

  useEffect(() => {
    fetchPosts(1)
  }, [fetchPosts])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 max-w-lg mx-auto">

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          <span className="material-icons text-5xl">auto_stories</span>
          <p className="mt-2 text-sm">No posts yet. Be the first to share knowledge!</p>
        </div>
      )}

      {/* Posts feed */}
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}

      {/* Load more */}
      {posts.length >= 10 && hasMore && (
        <div className="text-center py-4">
          <button
            onClick={loadMore}
            className="text-sm text-blue-600 border border-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition"
          >
            Load more
          </button>
        </div>
      )}

      {/* All caught up */}
      {posts.length >= 10 && !hasMore && (
        <div className="text-center py-4 text-gray-400 text-sm">
            You're all caught up!
        </div>
)}

    </div>
  )
}

export default Home