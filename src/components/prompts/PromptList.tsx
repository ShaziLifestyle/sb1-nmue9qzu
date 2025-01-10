@@ .. @@
   async function handleSubmit(e: React.FormEvent) {
     e.preventDefault();
     setError(null);
+    
+    if (!taskId) {
+      setError('Missing task ID');
+      return;
+    }
 
     // Validate required fields
     if (!newPrompt.name.trim()) {
@@ -    const { error: submitError } = await supabase
         .from('prompts')
         .insert([{ 
           ...newPrompt, 
-          task_id: taskId,
-          name_complete: false,
-          content_complete: false
+          task_id: taskId
         }]);
 
       if (submitError) throw submitError;