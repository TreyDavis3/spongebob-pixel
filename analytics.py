import matplotlib.pyplot as plt
import io
import random
import matplotlib

# Set non-interactive backend
matplotlib.use('Agg')

def generate_comparison_chart():
    # Data categories
    categories = ['Processing Power', 'Water Resistance', 'Camera Res', 'Jellyfish Detection']
    
    # Pixel 10 Stats (High and mostly stable)
    pixel_stats = [
        random.randint(90, 100), # Power
        random.randint(85, 95),  # Water Res
        random.randint(95, 100), # Camera
        random.randint(80, 90)   # Jellyfish
    ]
    
    # Shellphone Stats (Random and chaotic)
    shellphone_stats = [
        random.randint(10, 40),  # Power (It's a shell)
        random.randint(90, 100), # Water Res (It lives underwater)
        random.randint(5, 20),   # Camera (Blurry)
        random.randint(10, 30)   # Jellyfish
    ]

    # Create figure with dark theme to match site
    plt.style.use('dark_background')
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Transparent background
    fig.patch.set_alpha(0.0)
    ax.patch.set_alpha(0.0)

    # Bar width
    width = 0.35
    x = range(len(categories))

    # Plot bars
    ax.bar([i - width/2 for i in x], pixel_stats, width, label='Pixel 10 Pro', color='#a78bfa')
    ax.bar([i + width/2 for i in x], shellphone_stats, width, label='Shellphone', color='#FF99AC')

    # Styling
    ax.set_ylabel('Performance Score')
    ax.set_title('Pixel 10 Pro vs. Shellphone 🐚')
    ax.set_xticks(x)
    ax.set_xticklabels(categories)
    ax.legend()
    
    # Grid customization
    ax.grid(True, axis='y', alpha=0.1)
    for spine in ax.spines.values():
        spine.set_visible(False)

    # Save to buffer
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', dpi=100)
    plt.close(fig)
    buf.seek(0)
    
    return buf
