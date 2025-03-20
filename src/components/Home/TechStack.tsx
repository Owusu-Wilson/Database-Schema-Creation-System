import { PiFileSql } from "react-icons/pi";
import {

  SiPostgresql,
  SiSqlite,
  SiMongodb,
  SiSupabase,
  SiDrizzle,
  SiLaravel,

} from "react-icons/si";
import StackIcon from "./StackIcon";

const TechStack = () => {
  return (
    <div className=" mt-10 w-full max-w-2xl mx-auto  overflow-y-hidden">
      <p className="text-gray-500 text-center mb-5 opacity-0 animate-fade-in animate-delay-500">
        Works well with most Databases and ORMs
      </p>

      <div className="grid grid-cols-4 sm:grid-cols-7  mb-10">
        <StackIcon
          icon={PiFileSql}
          toolbarText="SQL"
          iconSize="w-8 h-8"
          iconColor="text-gray-600"
          toolbarPosition="bottom"
        />
        <StackIcon
          icon={SiPostgresql}
          toolbarText="Postgres"
          iconSize="w-8 h-8"
          iconColor="text-gray-600"
          toolbarPosition="bottom"
        />
        <StackIcon
          icon={SiSqlite}
          toolbarText="SQLite"
          iconSize="w-8 h-8"
          iconColor="text-gray-600"
          toolbarPosition="bottom"
        />
        <StackIcon
          icon={SiMongodb}
          toolbarText="MOngoDB"
          iconSize="w-8 h-8"
          iconColor="text-gray-600"
          toolbarPosition="bottom"
        />
        <StackIcon
          icon={SiSupabase}
          toolbarText="Supabase"
          iconSize="w-8 h-8"
          iconColor="text-gray-600"
          toolbarPosition="bottom"
        />
        <StackIcon
          icon={SiDrizzle}
          toolbarText="Drizzle ORM"
          iconSize="w-8 h-8"
          iconColor="text-gray-600"
          toolbarPosition="bottom"
        />
        <StackIcon
          icon={SiLaravel}
          toolbarText="Laravel Eloquent"
          iconSize="w-8 h-8"
          iconColor="text-gray-600"
          toolbarPosition="bottom"
        />
      </div>
    </div>
  );
};


export default TechStack;
