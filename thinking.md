# QA Thinking: Exam Results Application



\*\*Question:\*\* If an application shows exam results to students, what are the five worst things that could go wrong, and how would you test for each?



1\. \*\*Data Leakage (Student sees another student's results):\*\* 

&#x20;  \* \*How to test:\* Log in as Student A. Try to manually change the URL or API request to fetch Student B's ID. The system should block it (403 Forbidden).

2\. \*\*Incorrect Grade Calculation (Math error):\*\* 

&#x20;  \* \*How to test:\* Manually calculate the expected grade based on the input marks. Compare it to the system's output. Test edge cases like 0 marks, 100 marks, and decimal marks.

3\. \*\*Server Crash on High Traffic (Results day overload):\*\* 

&#x20;  \* \*How to test:\* Use a load testing tool to simulate 10,000 students logging in at the exact same second. The server should not crash.

4\. \*\*Data Loss (Results disappear after refresh):\*\* 

&#x20;  \* \*How to test:\* Load the results page, hit refresh 10 times, and verify the data remains intact and unchanged.

5\. \*\*Admin Bypass (Student accessing admin panel):\*\* 

&#x20;  \* \*How to test:\* Log in as a student. Try to access `/admin/dashboard`. The system should deny access and redirect them to the home page.

