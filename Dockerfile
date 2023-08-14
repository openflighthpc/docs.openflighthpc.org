# Use a smaller Python base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Install MkDocs, MkDocs Material theme, and MkDocs Macros plugin
RUN apt-get update && \
    apt-get install -y gcc g++ && pip install --no-cache-dir --upgrade pip &&  pip install --no-cache-dir mkdocs mkdocs-material mkdocs-minify-plugin mkdocs-macros-plugin codespell symspellpy mkdocs-spellcheck[codespell] && \
    rm -rf /var/lib/apt/lists/*  # Clean up package manager cache

# Expose the MkDocs development server port (default: 8000)
EXPOSE 8000

# Start the MkDocs development server
CMD ["mkdocs", "serve", "--dev-addr=0.0.0.0:8000"]
