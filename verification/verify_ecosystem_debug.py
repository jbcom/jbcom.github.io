from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        # Go to Ecosystem page
        print("Navigating to http://localhost:3000/ecosystem")
        page.goto("http://localhost:3000/ecosystem", timeout=60000)

        # Wait for content to load
        print("Waiting for content")
        page.wait_for_selector("body")

        # Take screenshot of initial state
        print("Taking initial screenshot")
        page.screenshot(path="verification/ecosystem_initial.png")

        # Check if the input exists
        print("Checking for search input")
        if page.get_by_placeholder("Search packages...").count() > 0:
            print("Found search input")
            page.get_by_placeholder("Search packages...").fill("game")

            # Wait for filter to apply
            page.wait_for_timeout(1000)

            # Take screenshot of filtered state
            print("Taking filtered screenshot")
            page.screenshot(path="verification/ecosystem_filtered.png")
        else:
            print("Search input NOT found. Dumping content:")
            # print(page.content())
            page.screenshot(path="verification/ecosystem_error.png")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/ecosystem_exception.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
