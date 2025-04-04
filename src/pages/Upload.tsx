
import { useState } from "react";
import { Upload as UploadIcon, FileType, Check, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const Upload = () => {
  const [jobRole, setJobRole] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!jobRole.trim()) {
      toast({
        variant: "destructive",
        title: "Job role is required",
        description: "Please enter a job role before uploading candidates",
      });
      return;
    }

    if (!file) {
      toast({
        variant: "destructive",
        title: "File is required",
        description: "Please select a CSV file to upload",
      });
      return;
    }

    setUploading(true);

    // Simulate file upload
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded for role: ${jobRole}`,
      });
      setJobRole("");
      setFile(null);
    }, 2000);
  };

  const sampleData = [
    ["name", "email", "phone", "experience", "education", "skills"],
    ["John Doe", "john@example.com", "555-1234", "5 years", "Bachelor's in CS", "React, Node.js, TypeScript"],
    ["Jane Smith", "jane@example.com", "555-5678", "3 years", "Master's in CS", "Python, Machine Learning, SQL"],
    ["Bob Johnson", "bob@example.com", "555-9012", "7 years", "PhD in CS", "Java, C++, Cloud Infrastructure"],
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Candidates</TabsTrigger>
            <TabsTrigger value="sample">Sample Format</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Candidates</CardTitle>
                <CardDescription>
                  Upload a CSV file containing candidate data for AI screening
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="job-role">Job Role</Label>
                  <Input 
                    id="job-role" 
                    placeholder="e.g. Frontend Developer"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Candidate CSV File</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => document.getElementById("file-upload")?.click()}>
                    <div className="flex flex-col items-center gap-2">
                      <UploadIcon className="h-10 w-10 text-gray-400" />
                      {file ? (
                        <div className="flex items-center gap-2 text-vettedge-700">
                          <FileType className="h-4 w-4" />
                          <span className="font-medium">{file.name}</span>
                        </div>
                      ) : (
                        <>
                          <p className="text-lg font-medium text-gray-700">Drag and drop or click to upload</p>
                          <p className="text-sm text-gray-500">CSV files only, max 5MB</p>
                        </>
                      )}
                    </div>
                    <Input 
                      id="file-upload" 
                      type="file" 
                      accept=".csv" 
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Tip</AlertTitle>
                  <AlertDescription>
                    Make sure your CSV file follows the sample format for best results. 
                    Check the "Sample Format" tab to see the required structure.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-vettedge-900 hover:bg-vettedge-800" 
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    "Upload Candidates"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sample">
            <Card>
              <CardHeader>
                <CardTitle>Sample CSV Format</CardTitle>
                <CardDescription>
                  Your CSV file should include these columns for optimal AI screening
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        {sampleData[0].map((header, i) => (
                          <th key={i} className="border border-gray-200 bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-500">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.slice(1).map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} className="border border-gray-200 px-4 py-2 text-sm">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Download Sample CSV</Button>
                <Button className="bg-vettedge-900 hover:bg-vettedge-800">
                  Copy Format
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Upload;
