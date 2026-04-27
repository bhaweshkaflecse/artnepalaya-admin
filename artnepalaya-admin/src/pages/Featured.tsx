import React from 'react';

export const Featured = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Featured Carousel</h3>
          <p className="text-sm text-gray-500">Maximum 3 artworks. These appear at the top of the mobile home feed.</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium">Add New Featured</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mock Featured Items */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-200 w-full" />
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-sm">Post #{item}029</p>
                <p className="text-xs text-gray-500">@artist_name</p>
              </div>
              <button className="text-red-600 text-sm font-medium hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};