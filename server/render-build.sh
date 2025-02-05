curl -fsSL https://get.pnpm.io/install.sh | sh -
export PATH="$HOME/.local/share/pnpm:$PATH"
pnpm install --frozen-lockfile
pnpm add -g ts-node
