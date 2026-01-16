export default function BlogPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8" dir="rtl">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          المدونة
        </h1>
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <p className="text-lg text-muted-foreground text-center">
            صلحة المدونة - قيد الإنشاء
          </p>
          <p className="text-sm text-muted-foreground text-center mt-4">
            هنا يمكن إضافة مقالات ومحتوى المدونة
          </p>
        </div>
      </div>
    </div>
  )
}
