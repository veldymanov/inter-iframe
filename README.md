# Dinarys Inter-iframe Communication Test Application

## Dinarys Inter-iframe Communication Test App Requirements

Please try to send it back to me prior our meeting.
In general this is a simple chat client using HTML, CSS, JavaScript, and just inter-iframe communication
There is no server code on this project, just client. Basically you can put everything in a directory that will include the "site"+assets you'll build and open it locally on the browser.
When a user opens the "site" all there is - is a "+" button. Every click on the "+" button adds an iframe to the page. This iframe is a chat client with the other iframes. Every iframe has a line you can write text in and press "send" to post. this post in shown on all iframes - like a chat room.
All the iframes should communicate with the parent frame using postMessage. iframes should not communicate directly between them.

Extra features (Optional):
Make it look nice
iFrame windows should be draggable on the screen.


## Workings of the Application

### Running the Application during Development with Browser-Sync

- From folder `C:\Users\User\Documents\GitHub\inter-iframe`
- Run `browser-sync start --server --files "*.*"`


## References

http://www.mograblog.com/2013/03/using-post-message-for-java-script-api-clients.html
