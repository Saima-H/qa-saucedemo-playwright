# QA Thinking: Exam Results Application



# Question: If an application shows exam results to students, what are the five worst things that could go wrong, and how would you test for each?



# Answer:five most critical failures for an exam results application, ranked by severity:

### 1. Data Leakage (Privacy Breach)
*   **What goes wrong:** A student logs in with their own credentials, but the system accidentally shows the results of another student. Alternatively, a hacker uses URL manipulation or Google Dorking to index and access private result pages without authentication.
*   **How to test:** 
    *   Log in as Student A. Intercept the API request/URL and change the `student_id` to Student B's ID. The system must return a `403 Forbidden` error.
    *   Try accessing the results URL in an Incognito window without logging in. It must redirect to the login page.

### 2. Incorrect Calculations (Math Errors)
*   **What goes wrong:** The code calculates the final grade, percentage, or CGPA incorrectly. This could ruin a student's academic record.
*   **How to test:** Write automated unit tests with edge-case inputs. Test with 0 marks, 100 marks, decimal marks (e.g., 99.5), and manually calculate the expected output to compare against the system's output.

### 3. Server Crash on High Traffic (Results Day Overload)
*   **What goes wrong:** On the day results are released, 10,000 students log in at the exact same second. The server crashes, and nobody can see their results.
*   **How to test:** Use a load-testing tool (like JMeter or Locust) to simulate thousands of concurrent users hitting the API. The server should implement rate limiting or auto-scaling instead of crashing.

### 4. Unauthorized Editing (Data Integrity)
*   **What goes wrong:** A student finds an API endpoint or form that allows them to change their marks, grades, or view the admin dashboard.
*   **How to test:** Log in as a student, and try to send a `PUT` or `POST` request to update the marks. The API must return `403 Forbidden`. Also, try to navigate to `/admin/dashboard` while logged in as a student; it should block access.

### 5. Data Loss / UI State Failure
*   **What goes wrong:** The database fails to save the results properly, or the website UI freezes (not responding) while loading the results, leaving the student staring at a blank screen.
*   **How to test:** 
    *   Load the results page, hit refresh 10 times, and ensure the data remains intact.
    *   Throttle the network connection to "Slow 3G" in browser DevTools to see if the UI handles loading states gracefully or if it freezes permanently.

---
# Bonus Edge Cases (Found during exploratory testing)
*   **Google Dorking:** Ensure sensitive result pages have `<meta name="robots" content="noindex">` so Google cannot index them in search results.
*   **Old Cached Data:** If a result is updated by a teacher, the student should not see the old cached version of the result upon refreshing.
*   **Hidden Fields:** Check that hidden HTML fields do not contain sensitive information like internal database IDs, passwords, or other students' info.
