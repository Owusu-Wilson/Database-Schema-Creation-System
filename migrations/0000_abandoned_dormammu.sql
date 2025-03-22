

CREATE TABLE "projects" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "title" text NOT NULL,
    "owner" uuid,
    "chats" jsonb,
    "is_public" boolean DEFAULT false NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "updated_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE "schema_outputs" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "project_id" uuid NOT NULL,
    "schema_type" text NOT NULL,
    "schema_data" json NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "updated_at" timestamptz DEFAULT now() NOT NULL
);


ALTER TABLE "projects"
ADD CONSTRAINT "projects_owner_profiles_id_fk"
FOREIGN KEY ("owner") REFERENCES "auth"."users"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "schema_outputs"
ADD CONSTRAINT "schema_outputs_project_id_projects_id_fk"
FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- Indexes for better performance
CREATE INDEX idx_projects_owner ON "projects"("owner");
CREATE INDEX idx_schema_outputs_project_id ON "schema_outputs"("project_id");
