const { execSync } = require('child_process');

function hasLibrary(lib) {
  try {
    const output = execSync('ldconfig -p', { encoding: 'utf8' });
    return output.includes(lib);
  } catch (e) {
    return false;
  }
}

function install() {
  try {
    execSync('apt-get update && apt-get install -y libssl1.1', { stdio: 'inherit' });
  } catch (err) {
    console.error('Automatic installation failed:', err.message);
  }
}

if (!hasLibrary('libssl.so.1.1') || !hasLibrary('libcrypto.so.1.1')) {
  if (process.env.INSTALL_LIBSSL === '1') {
    console.log('Attempting to install libssl1.1...');
    install();
    if (!hasLibrary('libssl.so.1.1') || !hasLibrary('libcrypto.so.1.1')) {
      console.error('libssl1.1 installation unsuccessful.');
      process.exit(1);
    }
  } else {
    console.error('Missing libssl.so.1.1 or libcrypto.so.1.1. Install libssl1.1 (e.g., `sudo apt-get install libssl1.1`) or run tests with INSTALL_LIBSSL=1 to attempt auto installation.');
    process.exit(1);
  }
}
