import random

def slice_sequences(data, max_len=5000):
  def getRandomSubstring(s):
    if (len(s) < max_len):
      return s

    max_range = len(s) - max_len
    start = random.randrange(0, max_range)

    return s[start:start+max_len]

  return list(map(getRandomSubstring, data))
