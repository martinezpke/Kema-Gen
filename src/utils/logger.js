const log = (message, type = 'info') => {
    const color = type === 'error' ? '\x1b[31m' : '\x1b[32m';
    console.log(`${color}%s\x1b[0m`, message);
};

export default log;
