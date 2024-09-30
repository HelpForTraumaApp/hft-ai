CREATE TABLE IF NOT EXISTS "dialoguemessages" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"is_text" boolean NOT NULL,
	"title_id" varchar(191) NOT NULL,
	"isSelf" boolean NOT NULL,
	"msgData" varchar NOT NULL,
	"timeStamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dialogueTitle" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"is_text" boolean NOT NULL,
	"ghost" varchar(191) NOT NULL,
	"title" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "embeddings" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"resource_id" varchar(191),
	"content" text NOT NULL,
	"embedding" vector(1536) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resources" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dialoguemessages" ADD CONSTRAINT "dialoguemessages_title_id_dialogueTitle_id_fk" FOREIGN KEY ("title_id") REFERENCES "public"."dialogueTitle"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "embeddings" ADD CONSTRAINT "embeddings_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "embeddingIndex" ON "embeddings" USING hnsw ("embedding" vector_cosine_ops);