#!/usr/bin/env python3
"""Assemble the Sandwich Sports Boosters multi-page site from shared shell templates."""
import os

SRC = os.path.dirname(os.path.abspath(__file__))
SCRATCH = SRC                      # editor-fragment.html now lives beside this script
REPO = os.path.dirname(SRC)        # the built pages go to the repo root
BASE_URL = 'https://sandwichsportsboosters.com'

PAGES = {
    'index.html': {
        'title': 'Sandwich Sports Boosters | Supporting Sandwich High School Athletics — Sandwich, IL',
        'desc': "The Sandwich Sports Boosters are an all-volunteer club backing every sport and every student-athlete at Sandwich High School — over $115,000 given back to SHS athletics since 2023.",
        'og_title': 'Sandwich Sports Boosters | Behind Every Team Is a Community',
        'og_desc': 'All-volunteer boosters supporting every SHS sport — equipment, scholarships, sportsmanship awards, and community events in Sandwich, IL.',
        'nav': 'home',
    },
    'events.html': {
        'title': 'Schedules | Sandwich Sports Boosters',
        'desc': "Every Sandwich High School athletic schedule in one place — the school's official schedules plus MaxPreps, IHSA and NFHS Network.",
        'og_title': 'SHS Sports Schedules | Sandwich Sports Boosters',
        'og_desc': 'Every Indians team, every game.',
        'nav': 'events',
    },
    'about.html': {
        'title': 'About Us | Sandwich Sports Boosters',
        'desc': "Who we are, where the money goes, the volunteers who run it, and the eight committees that keep SHS athletics funded. Over $115,000 returned since 2023.",
        'og_title': 'About the Sandwich Sports Boosters',
        'og_desc': 'All-volunteer, every sport, $115,000+ back into SHS athletics since 2023.',
        'nav': 'about',
    },
    'sponsorship.html': {
        'title': 'Sponsorship | Sandwich Sports Boosters',
        'desc': "Sponsor Sandwich High School athletics — see the levels in the Boosters sponsorship flyer, and the local businesses already backing every SHS team.",
        'og_title': 'Sponsor SHS Athletics | Sandwich Sports Boosters',
        'og_desc': 'Back every SHS team — see the sponsorship flyer and our current sponsors.',
        'nav': 'sponsorship',
    },
    'memberships.html': {
        'title': 'Memberships | Sandwich Sports Boosters',
        'desc': "Sandwich Sports Boosters membership is free. Volunteer one shift at a booster event to join, earn passes to home SHS games, and vote on board positions.",
        'og_title': 'Become a Member | Sandwich Sports Boosters',
        'og_desc': 'Free membership. Volunteer one shift and you are in.',
        'nav': 'memberships',
    },
    'coaches-corner.html': {
        'title': 'Coaches Corner | Sandwich Sports Boosters',
        'desc': "For SHS coaches — how to request equipment and funding from the Sandwich Sports Boosters, and what we have funded so far.",
        'og_title': 'Coaches Corner | Sandwich Sports Boosters',
        'og_desc': 'Resources and funding requests for Sandwich High School coaches.',
        'nav': 'coaches-corner',
    },
    'contact.html': {
        'title': 'Contact Us | Sandwich Sports Boosters',
        'desc': "Questions about sponsoring, joining a committee, volunteering, or membership? Reach the Sandwich Sports Boosters — we're quick to answer.",
        'og_title': 'Get in Touch | Sandwich Sports Boosters',
        'og_desc': 'Sponsorships, committees, volunteering, membership — send the Boosters a note.',
        'nav': 'contact',
    },
}

# Main nav = the club's own tab structure. Store is not a tab (it duplicates
# Become a Member); Contact lives in the footer + CTAs.
NAV_ITEMS = [
    ('index.html', 'home', 'Home', False),
    ('events.html', 'events', 'Schedules', False),
    ('about.html', 'about', 'About Us', False),
    ('sponsorship.html', 'sponsorship', 'Sponsorship', False),
    ('memberships.html', 'memberships', 'Memberships', False),
    ('coaches-corner.html', 'coaches-corner', 'Coaches Corner', False),
]

def read(p):
    with open(os.path.join(SRC, p), encoding='utf-8') as f:
        return f.read()

def nav_links(active):
    out = []
    for href, key, label, external in NAV_ITEMS:
        cls = 'lk active' if key == active else 'lk'
        cur = ' aria-current="page"' if key == active else ''
        ext = ' target="_blank" rel="noopener"' if external else ''
        out.append(f'      <a class="{cls}"{cur} href="{href}"{ext}>{label}</a>')
    out.append('      <a class="btn btn-primary nav-cta" href="sponsorship.html">Become a Sponsor</a>')
    return '\n'.join(out)

def build():
    head_tpl = read('head.tpl.html')
    css = read('shell.css')
    header_tpl = read('header.tpl.html')
    footer = read('footer.tpl.html')
    base_js = read('base.js.html')
    editor = open(os.path.join(SCRATCH, 'editor-fragment.html'), encoding='utf-8').read()

    for fname, meta in PAGES.items():
        body = read(f'pages/{fname}')
        page_css = ''
        pc_path = os.path.join(SRC, 'pages', fname.replace('.html', '.css'))
        if os.path.exists(pc_path):
            page_css = '\n/* ---- page-specific ---- */\n' + open(pc_path, encoding='utf-8').read()
        canon = BASE_URL + '/' if fname == 'index.html' else f'{BASE_URL}/{fname}'
        head = (head_tpl
                .replace('{TITLE}', meta['title'])
                .replace('{DESC}', meta['desc'])
                .replace('{OG_TITLE}', meta['og_title'])
                .replace('{OG_DESC}', meta['og_desc'])
                .replace('{CANON}', canon)
                .replace('{BASE_URL}', BASE_URL))
        header = header_tpl.replace('{NAV_LINKS}', nav_links(meta['nav']))
        html = (head
                + '<style>\n' + css + page_css + '</style>\n</head>\n<body>\n'
                + header + '\n' + body + '\n' + footer + '\n'
                + base_js + '\n' + editor + '\n</body>\n</html>\n')
        with open(os.path.join(REPO, fname), 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'{fname}: {len(html)//1024}KB')

if __name__ == '__main__':
    build()
