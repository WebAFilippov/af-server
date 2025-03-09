-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT,
    "pubDate" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,
    "creatorId" TEXT,
    "content" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "contentUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "credit" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");

-- CreateIndex
CREATE INDEX "News_slug_idx" ON "News"("slug");

-- CreateIndex
CREATE INDEX "News_pubDate_idx" ON "News"("pubDate");

-- CreateIndex
CREATE INDEX "News_categoryId_idx" ON "News"("categoryId");

-- CreateIndex
CREATE INDEX "News_creatorId_idx" ON "News"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_newsId_key" ON "Media"("newsId");

-- CreateIndex
CREATE INDEX "Media_newsId_idx" ON "Media"("newsId");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_name_key" ON "Creator"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
