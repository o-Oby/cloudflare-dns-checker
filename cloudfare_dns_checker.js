import puppeteer from 'puppeteer-extra';

async function fetchConnectionInfo() {
  // Launch the browser in headless mode with specified arguments for performance
  const browser = await puppeteer.launch({
	headless: true,
	executablePath: '/usr/bin/chromium-browser',
	args: [
	  '--no-sandbox',
	  '--disable-setuid-sandbox',
	  '--disable-dev-shm-usage',
	  '--disable-gpu',
	  '--no-first-run',
	  '--no-zygote',
	  '--single-process',
	],
  });

  const page = await browser.newPage();

  // Navigate to the Cloudflare 1.1.1.1 help page and wait until the network is idle
  await page.goto('https://one.one.one.one/help/', { waitUntil: 'networkidle2' });

  console.log("Fetching connection information...");

  const connectionInfo = {};

  // Fetch the connection details and log them step-by-step
  connectionInfo.connectedTo = await page.$eval('td[data-ref="isCf"]', el => el.innerText);
  console.log(`Connected to 1.1.1.1: ${connectionInfo.connectedTo}`);

  connectionInfo.usingDoH = await page.$eval('td[data-ref="isDoh"]', el => el.innerText);
  console.log(`Using DNS over HTTPS (DoH): ${connectionInfo.usingDoH}`);

  connectionInfo.usingDoT = await page.$eval('td[data-ref="isDot"]', el => el.innerText);
  console.log(`Using DNS over TLS (DoT): ${connectionInfo.usingDoT}`);

  connectionInfo.usingWARP = await page.$eval('td[data-ref="isWarp"]', el => el.innerText);
  console.log(`Using DNS over WARP: ${connectionInfo.usingWARP}`);

  connectionInfo.asName = await page.$eval('td[data-ref="ispName"]', el => el.innerText);
  console.log(`AS Name: ${connectionInfo.asName}`);

  connectionInfo.asNumber = await page.$eval('td[data-ref="ispAsn"]', el => el.innerText);
  console.log(`AS Number: ${connectionInfo.asNumber}`);

  connectionInfo.dataCenter = await page.$eval('td[data-ref="datacenterLocation"]', el => el.innerText);
  console.log(`Cloudflare Data Center: ${connectionInfo.dataCenter}`);

  // Fetch resolver IPs and their statuses
  const resolverIps = await page.$$eval('td[class="ip-address"]', ips => ips.map(ip => ip.innerText));
  const resolverStatuses = await page.$$eval('td[data-ref^="resolverIp"]', statuses => statuses.map(status => status.innerText));

  connectionInfo.resolverIps = resolverIps.map((ip, index) => ({
	ip,
	status: resolverStatuses[index]
  }));

  console.log(`Resolver IP Addresses:`);
  connectionInfo.resolverIps.forEach(ipInfo => {
	console.log(`  - ${ipInfo.ip}: ${ipInfo.status}`);
  });

  await browser.close();
}

// Execute the function to fetch and log connection information
fetchConnectionInfo();
