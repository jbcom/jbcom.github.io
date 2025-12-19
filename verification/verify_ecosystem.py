from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to Ecosystem page
    page.goto("http://localhost:3000/ecosystem")

    # Wait for content to load
    page.wait_for_selector("text=Ecosystem")

    # Take screenshot of initial state
    page.screenshot(path="verification/ecosystem_initial.png")

    # Type in search
    page.get_by_placeholder("Search packages...").fill("game")

    # Wait for filter to apply
    page.wait_for_timeout(1000)

    # Take screenshot of filtered state
    page.screenshot(path="verification/ecosystem_filtered.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
