const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
    <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <p className="text-lg font-medium mb-2">No data available</p>
    <p className="text-sm">There are no records to display at this time.</p>
  </div>
);

export default EmptyState;
