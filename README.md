Here is a detailed README file for your Puppeteer script:

---

# Connection Info Fetcher

This script uses Puppeteer to launch a headless Chromium browser and navigate to the Cloudflare 1.1.1.1 help page. It fetches and logs various connection details such as DNS settings, Cloudflare Data Center, and resolver IPs.

## Prerequisites

Ensure you have Node.js and npm installed on your system. You will also need to have Chromium installed and Puppeteer Extra and its plugins.

### Installation of Chromium on Debian-based systems

```bash
sudo apt-get update
sudo apt-get install chromium-browser
```

### Installation of Puppeteer Extra

```bash
npm install puppeteer-extra
npm install puppeteer-extra-plugin-stealth
```

## Usage

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Create the script file**

    Create a JavaScript file (e.g., `fetchConnectionInfo.js`) and copy the provided script into the file.

3. **Run the script**

    ```bash
    node fetchConnectionInfo.js
    ```

## Script Explanation

This script does the following:

1. **Launches a headless Chromium browser** with specific arguments for performance.
2. **Navigates to the Cloudflare 1.1.1.1 help page** and waits until the network is idle.
3. **Fetches connection details**:
    - Whether connected to 1.1.1.1
    - Whether using DNS over HTTPS (DoH)
    - Whether using DNS over TLS (DoT)
    - Whether using DNS over WARP
    - AS Name
    - AS Number
    - Cloudflare Data Center
4. **Fetches resolver IPs and their statuses**.
5. **Logs all the fetched information**.

## Example Output

```text
Fetching connection information...
Connected to 1.1.1.1: Yes
Using DNS over HTTPS (DoH): Yes
Using DNS over TLS (DoT): No
Using DNS over WARP: No
AS Name: AS12345
AS Number: 12345
Cloudflare Data Center: ABC
Resolver IP Addresses:
  - 1.1.1.1: OK
  - 1.0.0.1: OK
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
