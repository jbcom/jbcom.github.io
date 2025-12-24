from playwright.sync_api import sync_playwright

def verify_clear_button():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the Ecosystem page (using client-side routing)
        # We start at root which loads the React app, then navigate to ecosystem
        page.goto("http://localhost:3000/")

        # Wait for app to load (checking for navigation)
        page.wait_for_selector('a[href="/ecosystem"]', state="visible")

        # Click ecosystem link
        page.click('a[href="/ecosystem"]')

        # Wait for the search input to be visible
        # It's a TextField with placeholder "Search packages..."
        search_input = page.get_by_placeholder("Search packages...")
        search_input.wait_for()

        # Type something into the search input
        search_input.fill("test")

        # Verify the clear button appears
        # It has aria-label="Clear search"
        clear_button = page.get_by_label("Clear search")
        clear_button.wait_for()

        # Take a screenshot with the clear button visible
        page.screenshot(path="verification/search_with_clear_button.png")

        # Click the clear button
        clear_button.click()

        # Verify the input is cleared
        search_value = search_input.input_value()
        assert search_value == "", f"Expected empty search input, but got '{search_value}'"

        # Take a screenshot after clearing
        page.screenshot(path="verification/search_cleared.png")

        browser.close()

if __name__ == "__main__":
    verify_clear_button()
