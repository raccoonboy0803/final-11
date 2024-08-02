-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "seller_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("seller_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "productseller_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "is_payed" BOOLEAN NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "order_user_id" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "cart_id" TEXT NOT NULL,
    "cart_user_id" TEXT NOT NULL,
    "cart_product_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "review_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "review_user_id" TEXT NOT NULL,
    "review_product_id" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "Chatroom" (
    "chatroom_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatroom_user_id" TEXT NOT NULL,
    "chatroom_seller_id" TEXT NOT NULL,
    "chatroom_product_id" TEXT NOT NULL,

    CONSTRAINT "Chatroom_pkey" PRIMARY KEY ("chatroom_id")
);

-- CreateTable
CREATE TABLE "Message" (
    "message_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payload" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL,
    "message_chatroom_id" TEXT NOT NULL,
    "message_user_id" TEXT NOT NULL,
    "message_seller_id" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "Livestream" (
    "livestream_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stream_key" TEXT NOT NULL,
    "stream_id" TEXT NOT NULL,
    "video_uid" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "livestream_seller_id" TEXT NOT NULL,
    "livestream_product_id" TEXT NOT NULL,

    CONSTRAINT "Livestream_pkey" PRIMARY KEY ("livestream_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_order_user_id_key" ON "Order"("order_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_cart_user_id_key" ON "Cart"("cart_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Chatroom_chatroom_product_id_key" ON "Chatroom"("chatroom_product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_message_user_id_key" ON "Message"("message_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_message_seller_id_key" ON "Message"("message_seller_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productseller_id_fkey" FOREIGN KEY ("productseller_id") REFERENCES "Seller"("seller_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_order_user_id_fkey" FOREIGN KEY ("order_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_cart_user_id_fkey" FOREIGN KEY ("cart_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_cart_product_id_fkey" FOREIGN KEY ("cart_product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_review_user_id_fkey" FOREIGN KEY ("review_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_review_product_id_fkey" FOREIGN KEY ("review_product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_chatroom_user_id_fkey" FOREIGN KEY ("chatroom_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_chatroom_seller_id_fkey" FOREIGN KEY ("chatroom_seller_id") REFERENCES "Seller"("seller_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_chatroom_product_id_fkey" FOREIGN KEY ("chatroom_product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_message_chatroom_id_fkey" FOREIGN KEY ("message_chatroom_id") REFERENCES "Chatroom"("chatroom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_message_user_id_fkey" FOREIGN KEY ("message_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_message_seller_id_fkey" FOREIGN KEY ("message_seller_id") REFERENCES "Seller"("seller_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livestream" ADD CONSTRAINT "Livestream_livestream_seller_id_fkey" FOREIGN KEY ("livestream_seller_id") REFERENCES "Seller"("seller_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livestream" ADD CONSTRAINT "Livestream_livestream_product_id_fkey" FOREIGN KEY ("livestream_product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
