from playwright.sync_api import sync_playwright

def verify_card_links():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server (served from dist)
        page.goto("http://localhost:8000/")

        # Wait for the categories section to be visible (h2 in static, h5 in React)
        page.wait_for_selector(':is(h2, h5):has-text("Categories")')


        # Look for the specific link (allow both .html and non-.html versions)
        ai_link = page.locator('a[href*="/ecosystem"][href*="category=ai"]')


        if ai_link.count() > 0:
            print("Found AI category link")
            ai_link.first.scroll_into_view_if_needed()
            ai_link.first.screenshot(path="verification/category_card.png")
            print("SUCCESS: Card has correct link")
        else:
            print("FAILURE: Card link not found")

        browser.close()

if __name__ == "__main__":
    verify_card_links()
