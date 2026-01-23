const fs = require("fs");

fs.writeFileSync(
  "File_System_Operations_Answers.txt",
  `
1. What is the difference between synchronous and asynchronous file operations?
Synchronous file operations block the execution of the program until the file task is completed.
Asynchronous file operations do not block execution and allow the program to continue running.

2. When should you use file streams instead of reading the entire file?
File streams should be used when handling large files to reduce memory usage and process data in chunks.

3. Explain the purpose of the 'utf8' encoding parameter in file operations.
The 'utf8' encoding converts binary data into readable text format. Without it, data is returned as a buffer.

4. What are the common error codes in file system operations and what do they mean?
ENOENT means file or directory not found.
EACCES means permission denied.
EISDIR means the given path is a directory.
ENOTDIR means a directory was expected but a file was found.
EEXIST means file already exists.

5. How would you safely delete a directory with all its contents?
A directory can be safely deleted using recursive deletion which removes all files and subdirectories first.

6. Explain the concept of piping in streams with an example.
Piping transfers data from one stream to another automatically.
Example: Reading data from one file and writing it into another file using streams.

7. Why is it important to handle errors in file operations?
Error handling prevents program crashes and helps manage missing files, permission issues, and system failures.

8. What is the difference between writeFile and appendFile methods?
writeFile overwrites the existing file content.
appendFile adds new content to the end of the file.
`
);

console.log("✅ File_System_Operations_Answers.txt created successfully");
