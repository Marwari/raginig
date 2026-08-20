import http.server
import socketserver
import os

PORT = 4321
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            try:
                error_page_path = os.path.join(DIRECTORY, '404.html')
                with open(error_page_path, 'rb') as f:
                    content = f.read()
                self.send_response(404)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.send_header('Content-Length', str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return
            except Exception:
                pass
        super().send_error(code, message, explain)

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', PORT), CustomHTTPHandler) as httpd:
        print(f"Serving local dev site with custom 404 at http://localhost:{PORT}")
        httpd.serve_forever()
