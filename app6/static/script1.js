document.addEventListener('DOMContentLoaded', () => {
    const claimsContainer = document.getElementById('claims-container');
    let activeClaim = null;
    let startTime = null;
    let intervalId = null;

    // Get the stopwatch element
    const stopwatch = document.getElementById('stopwatch');

    // Start the stopwatch
    function startStopwatch() {
        startTime = Date.now();
        intervalId = setInterval(updateStopwatch, 10);
    }

    // Update the stopwatch
    function updateStopwatch() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const milliseconds = (elapsedTime % 1000).toString().padStart(3, '0'); // Ensure milliseconds have 3 digits

        stopwatch.innerText = `${seconds}.${milliseconds}`;
    }

    // Function to stop the stopwatch
    function stopStopwatch() {
        clearInterval(intervalId);
    }

    // Function to reset the stopwatch
    function resetStopwatch() {
        stopwatch.innerText = '0.000';
    }

    const trueClaims = [
        'As U.S. budget fight looms, Republicans flip their fiscal script',
        'U.S. military to accept transgender recruits on Monday',
        'Senior U.S. Republican senator: "Let Mr. Mueller do his job"',
        'FBI Russia probe helped by Australian diplomat tip-off: NYT',
        'Trump wants Postal Service to charge "much more" for Amazon shipments',
        'White House, Congress prepare for talks on spending, immigration',
        'Trump says Russia probe will be fair, but timeline unclear',
        'New York governor questions the constitutionality of federal tax overhaul',
        'Alabama official to certify Senator-elect Jones today despite challenge: CNN',
        'Jones certified U.S. Senate winner despite Moore challenge',
        'Man says he delivered manure to Mnuchin to protest new U.S. tax law',
        'Virginia officials postpone lottery drawing to decide tied statehouse election',
        'U.S. lawmakers question businessman at 2016 Trump Tower meeting: sources',
        'U.S. appeals court rejects challenge to Trump voter fraud panel',
        'Treasury Secretary Mnuchin was sent gift-wrapped box of horse manure: reports',
        'Federal judge partially lifts Trump`s latest refugee restrictions',
        'Exclusive: U.S. memo weakens guidelines for protecting immigrant children in court',
        'Trump travel ban should not apply to people with strong U.S. ties: court',
        'Second court rejects Trump bid to stop transgender military recruits',
        'Failed vote to oust president shakes up Peru`s politics',
        'Trump signs tax, government spending bills into law',
        'Companies have up to a year for new U.S. tax bill reporting: SEC',
        'Mexico to review need for tax changes after U.S. reform-document',
        'Senate leader McConnell sees a more collegial 2018',
        'Alabama to certify Democrat Jones winner of Senate election',

    ];

    const fakeClaims = [
        'Drunk Bragging Trump Staffer Started Russian Collusion Investigation',
        'Sheriff David Clarke Becomes An Internet Joke For Threatening To Poke People "In The Eye"',
        'Trump Is So Obsessed He Even Has Obama’s Name Coded Into His Website',
        'Pope Francis Just Called Out Donald Trump During His Christmas Speech',
        'Racist Alabama Cops Brutalize Black Boy While He Is In Handcuffs',
        'Fresh Off The Golf Course, Trump Lashes Out At FBI Deputy Director And James Comey',
        'Trump Said Some INSANELY Racist Stuff Inside The Oval Office, And Witnesses Back It Up',
        'Former CIA Director Slams Trump Over UN Bullying, Openly Suggests He’s Acting Like A Dictator (TWEET)',
        'WATCH: Brand-New Pro-Trump Ad Features So Much A** Kissing It Will Make You Sick',
        ' Papa John’s Founder Retires, Figures Out Racism Is Bad For Business',
        'WATCH: Paul Ryan Just Told Us He Doesn’t Care About Struggling Families Living In Blue States',
        'Bad News For Trump — Mitch McConnell Says No To Repealing Obamacare In 2018',
        'WATCH: Lindsey Graham Trashes Media For Portraying Trump As ‘Kooky,’ Forgets His Own Words',
        'Heiress To Disney Empire Knows GOP Scammed Us – SHREDS Them For Tax Bill',
        'Tone Deaf Trump: Congrats Rep. Scalise On Losing Weight After You Almost Died',
        'The Internet Brutally Mocks Disney’s New Trump Robot At Hall Of Presidents',
        'Mueller Spokesman Just F-cked Up Donald Trump’s Christmas',
        'SNL Hilariously Mocks Accused Child Molester Roy Moore For Losing AL Senate Race (VIDEO)',
        'Republican Senator Gets Dragged For Going After Robert Mueller',
        'In A Heartless Rebuke To Victims, Trump Invites NRA To Xmas Party On Sandy Hook Anniversary',
        'KY GOP State Rep. Commits Suicide Over Allegations He Molested A Teen Girl (DETAILS)',
        'Meghan McCain Tweets The Most AMAZING Response To Doug Jones’ Win In Deep-Red Alabama',
        'CNN CALLS IT: A Democrat Will Represent Alabama In The Senate For The First Time In 25 Years',
    ];

    // Function to randomly select items from an array
    function getRandomItems(arr, count) {
        const shuffled = arr.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
}   

    // Randomly select 5 true and 5 false claims
    const selectedTrueClaims = getRandomItems(trueClaims, 3);
    const selectedFalseClaims = getRandomItems(fakeClaims, 3);

    const allClaims = selectedTrueClaims.concat(selectedFalseClaims);

    for (const claimText of allClaims) {
        const claim = document.createElement('div');
        claim.classList.add('claim');
        claim.textContent = claimText;
        claimsContainer.appendChild(claim);
        claim.draggable = true;

        claim.addEventListener('dragstart', (e) => {
        activeClaim = e.target;
        });

        claim.addEventListener('dragend', () => {
        activeClaim = null;
        });
    }

    const categories = document.querySelectorAll('.category');
    categories.forEach((category) => {
        category.addEventListener('dragover', (e) => e.preventDefault());
        category.addEventListener('drop', handleDrop);
    });

    function handleDrop(e) {
        e.preventDefault();
        if (activeClaim && e.target.classList.contains('category')) {
            // Check if the activeClaim exists in either trueClaims or falseClaims
            const claimText = activeClaim.textContent;
            const isInTrueClaims = trueClaims.includes(claimText);
            const isInFalseClaims = fakeClaims.includes(claimText);

            if (isInTrueClaims && e.target.id === 'true-category') {
                // Correct drop into the true category
                e.target.appendChild(activeClaim);
                activeClaim.style.backgroundColor = '#3EB489'; // Green
            } else if (isInFalseClaims && e.target.id === 'false-category') {
                // Correct drop into the false category
                e.target.appendChild(activeClaim);
                activeClaim.style.backgroundColor = '#3EB489'; // Green
            } else {
                // Incorrect drop, add the 'invalid' class
                activeClaim.classList.add('invalid');

                // Use setTimeout to remove the 'invalid' class after 2 seconds
                setTimeout(() => {
                    activeClaim.classList.remove('invalid');
                    // Add 1 second to the stopwatch
                    startTime -= 1000;
                    resetStopwatch();
                }, 2000);
            }

            activeClaim = null;

            // Check if all claim boxes are in the correct categories
            const allClaims = document.querySelectorAll('.claim');
            const allCorrect = Array.from(allClaims).every((claim) => {
                const claimText = claim.textContent;
                const isInTrueClaims = trueClaims.includes(claimText);
                const isInFalseClaims = fakeClaims.includes(claimText);

                if (isInTrueClaims && claim.parentElement.id === 'true-category') {
                    return true;
                } else if (isInFalseClaims && claim.parentElement.id === 'false-category') {
                    return true;
                } else {
                    return false;
                }
            });

            if (allCorrect) {
                const congratulationsScreen = document.getElementById('congratulations-screen');
                congratulationsScreen.style.display = 'flex';

                // Display the final elapsed time on the Congratulations screen
                const finalTime = stopwatch.innerText;
                document.getElementById('final-time').textContent = `Time: ${finalTime}`;
                // Stop the stopwatch when the congratulations screen is shown
                stopStopwatch();
            }
        }
    }

    // Start the stopwatch when the page loads
    startStopwatch();
});

// Function to close the Congratulations screen
function closeCongratulationsScreen() {
    const congratulationsScreen = document.getElementById('congratulations-screen');
    congratulationsScreen.style.display = 'none';
    location.reload();
}
