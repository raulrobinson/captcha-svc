# Demo for Captcha trivial 

API for Generation and Validation of a Captcha

### Sample functions

#### Generate Captcha

```javascript
// Function to fetch a new captcha
const fetchCaptcha = async () => {
    try {
        const res = await fetch("/api/captcha");
        const data = await res.json();
        setCaptcha(data.svg);
        setCaptchaText(data.text);
    } catch (error) {
        console.error("Error loading Captcha:", error);
    }
};
```

#### Validate Captcha

```javascript
// Check if the username and password are provided.
if (!username || !password || !captchaInput) {
    setError('Please complete all the fields');
    setIsLoading(false);
    return;
}

// Send the captcha to the server for validation
const response = await fetch("/api/captcha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ captchaInput, captchaSession: captchaText }),
});

const captcha = await response.json(); // Get the response data
setIsValidCaptcha(captcha.success);    // TRUE if the captcha is valid, FALSE otherwise.

// If the captcha is valid, show a success message, otherwise show an error message.
if (captcha.success) {
    ...
```

### Author: [Raul Bolivar Navas](https://github.com/raulrobinson)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


