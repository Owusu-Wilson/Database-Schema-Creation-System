import React, { useState } from 'react';
import { Code, Eye, ChevronDown, Database, Server, FileText } from 'lucide-react';
import { TbSql } from 'react-icons/tb';
import { SiDrizzle, SiLaravel, SiMongodb, SiMongoose, SiMysql, SiPostgresql, SiPrisma, SiSqlite } from 'react-icons/si';

type Tab = 'code' | 'diagram';
type OptionType = 'mysql' | 'postgres' | 'mongo' | 'sqlite' | 'drizzle' | 'eloquent' | 'prisma' | 'mongoose' | 'general';

const OutputPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>('code');
  const [selectedOption, setSelectedOption] = useState<OptionType>('general');

  const databaseOptions: { type: OptionType; label: string; icon: JSX.Element }[] = [
    { type: 'mysql', label: 'MySQL', icon: <SiMysql size={16} className="mr-2" /> },
    { type: 'postgres', label: 'PostgreSQL', icon: <SiPostgresql size={16} className="mr-2" /> },
    { type: 'mongo', label: 'MongoDB', icon: <SiMongodb size={16} className="mr-2" /> },
    { type: 'sqlite', label: 'SQLite', icon: <SiSqlite size={16} className="mr-2" /> },
  ];

  const ormOptions: { type: OptionType; label: string; icon: JSX.Element }[] = [
    { type: 'drizzle', label: 'Drizzle', icon: <SiDrizzle size={16} className="mr-2" /> },
    { type: 'eloquent', label: 'Eloquent', icon: <SiLaravel size={16} className="mr-2" /> },
    { type: 'prisma', label: 'Prisma', icon: <SiPrisma size={16} className="mr-2" /> },
    { type: 'mongoose', label: 'Mongoose', icon: <SiMongoose size={16} className="mr-2" /> },
  ];

  const generalOption: { type: OptionType; label: string; icon: JSX.Element } = {
    type: 'general',
    label: 'General Schema',
    icon: <FileText size={16} className="mr-2" />,
  };

  return (
    <div className="flex flex-col h-screen bg-schema-darker">
      {/* Tabs for Code and Diagram */}
      <div className="flex border-b border-schema-gray">
        <button
          className={`px-4 py-2 flex items-center transition-transform duration-300  ${
            activeTab === 'code' ? 'border-b-2 border-schema-green text-white' : 'text-schema-gray'
          }`}
          onClick={() => setActiveTab('code')}
        >
          <Code size={16} className="mr-2" />
          Code
        </button>
        <button
          className={`px-4 py-2 flex items-center transition-transform duration-300 ${
            activeTab === 'diagram' ? 'border-b-2 border-schema-green text-white' : 'text-schema-gray'
          }`}
          onClick={() => setActiveTab('diagram')}
        >
          <Eye size={16} className="mr-2" />
          Diagram
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-auto">
        {/* Left Panel: Option Selection */}
        <div className="w-1/4 border-r border-schema-gray p-4">
          {/* General Schema Section */}
          <div className="mb-6">
            <h3 className="text-sm text-schema-gray mb-2 flex items-center">
              <FileText size={16} className="mr-2" />
              General
            </h3>
            <button
              className={`w-full text-left px-3 py-2 rounded text-sm flex items-center ${
                selectedOption === generalOption.type
                  ? 'bg-gradient-to-r from-schema-green to-schema-dark text-white'
                  : 'bg-schema-dark text-schema-gray hover:bg-schema-darkest'
              }`}
              onClick={() => setSelectedOption(generalOption.type)}
            >
              {generalOption.icon}
              {generalOption.label}
            </button>
          </div>

          {/* Databases Section */}
          <div className="mb-6">
            <h3 className="text-sm text-schema-gray mb-2 flex items-center">
              <Database size={16} className="mr-2" />
              Databases
            </h3>
            <div className="flex flex-col space-y-2">
              {databaseOptions.map((db) => (
                <button
                  key={db.type}
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center ${
                    selectedOption === db.type
                      ? 'bg-gradient-to-r from-schema-green to-schema-dark text-white'
                      : 'bg-schema-dark text-schema-gray hover:bg-schema-darkest'
                  }`}
                  onClick={() => setSelectedOption(db.type)}
                >
                  {db.icon}
                  {db.label}
                </button>
              ))}
            </div>
          </div>

          {/* ORMs Section */}
          <div>
            <h3 className="text-sm text-schema-gray mb-2 flex items-center">
              <Server size={16} className="mr-2" />
              ORMs
            </h3>
            <div className="flex flex-col space-y-2">
              {ormOptions.map((orm) => (
                <button
                  key={orm.type}
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center ${
                    selectedOption === orm.type
                      ? 'bg-gradient-to-r from-schema-green to-schema-dark text-white'
                      : 'bg-schema-dark text-schema-gray hover:bg-schema-darkest'
                  }`}
                  onClick={() => setSelectedOption(orm.type)}
                >
                  {orm.icon}
                  {orm.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Code or Diagram */}
        <div className="w-3/4 flex flex-col">
          {activeTab === 'code' && (
            <>
              <div className="p-2 border-b border-schema-gray flex items-center">
                <span className="text-schema-gray text-sm mr-2">Generated Code</span>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <div className="font-mono text-sm text-white">
                  <pre>
                    {selectedOption === 'general'
                      ? `// General Schema\n// This is a placeholder for the general schema.`
                      : `// Example ${selectedOption.toUpperCase()} schema\n// This is a placeholder for the generated code.`}
                  </pre>
                </div>
              </div>
            </>
          )}

          {activeTab === 'diagram' && (
            <div className="flex-1 bg-white">
              <iframe
                src="about:blank"
                className="w-full h-full border-none"
                title="Diagram"
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-2 border-t border-schema-gray bg-schema-dark">
        <div className="flex items-center">
          <div className="bg-schema-blue rounded px-2 py-1 text-xs text-white">
            <span className="font-bold">schema</span>
          </div>
          <div className="ml-4 text-schema-gray text-xs">
            <span>Terminal</span>
          </div>
        </div>
        <ChevronDown size={16} className="text-schema-gray" />
      </div>

      {/* Terminal */}
      <div className="flex-[0.3] bg-schema-darker border-t border-schema-gray p-3 font-mono text-sm text-white overflow-auto">
        <div className="text-schema-blue">/project</div>
        <div>&gt; <span className="text-schema-blue">npm install</span></div>
        <div className="flex">
          <div className="w-16 bg-schema-gray h-4 mr-2"></div>
          <div className="text-white"> \ <span className="text-schema-blue">reify</span>:<span className="text-schema-blue">finalize</span>: <span className="text-green-500">timing</span> <span className="text-pink-500">reifyUnpack</span> Completed in 142ms</div>
        </div>
      </div>
    </div>
  );
};

export default OutputPanel;